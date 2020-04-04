import {AuthenticationComponent} from '@loopback/authentication';
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {
  ApplicationConfig,
  BindingKey,
  createBindingFromClass,
} from '@loopback/core';
import {
  model,
  property,
  RepositoryMixin,
  SchemaMigrationOptions,
} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import {JWTAuthenticationStrategy} from './authentication-strategies/jwt-strategy';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  TokenServiceConstants,
  UserServiceBindings,
} from './keys';
import {User, Skill} from './models';
import {UserRepository, SkillRepository} from './repositories';
import {MyAuthenticationSequence} from './sequence';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {JWTService} from './services/jwt-service';
import {MyUserService} from './services/user-service';
import YAML = require('yaml');

/**
 * Information from package.json
 */
export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

@model()
export class NewUser extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class HoplApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options?: ApplicationConfig) {
    super(options);

    this.setUpBindings();

    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);

    // authentication
    this.add(createBindingFromClass(JWTAuthenticationStrategy));

    // Set up the custom sequence
    this.sequence(MyAuthenticationSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    // // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }

  async start() {
    // Use `databaseSeeding` flag to control if products/users should be pre
    // populated into the database. Its value is default to `true`.
    if (this.options.databaseSeeding !== false) {
      await this.migrateSchema();
    }
    return super.start();
  }

  async migrateUsers(options?: SchemaMigrationOptions) {
    const passwordHasher = await this.get(
      PasswordHasherBindings.PASSWORD_HASHER,
    );
    const userRepo = await this.getRepository(UserRepository);

    try {
      await userRepo.deleteAll();
    } catch (e) {
      console.error('Problem while cleaning up pre-migration', e);
    }
    const usersDir = path.join(__dirname, '../fixtures/users');
    const userFiles = fs.readdirSync(usersDir);

    for (const file of userFiles) {
      if (file.endsWith('.yml')) {
        const userFile = path.join(usersDir, file);
        const yamlString = YAML.parse(fs.readFileSync(userFile, 'utf8'));
        const input = new NewUser(yamlString);
        const password = await passwordHasher.hashPassword(input.password);
        input.password = password;
        try {
          await userRepo.deleteAll();
          const user = await userRepo.create(_.omit(input, 'password'));
          await userRepo.userCredentials(user.id).create({password});
        } catch (e) {
          console.error('Problem while cleaning up pre-migration', e);
        }
      }
    }
  }

  async migrateSkills(options?: SchemaMigrationOptions) {
    const skillsRepo = await this.getRepository(SkillRepository);
    try {
      await skillsRepo.deleteAll();
    } catch (e) {
      console.error('Problem while cleaning up pre-migration', e);
    }
    const skillsDir = path.join(__dirname, '../fixtures/skills');
    const skillsFiles = fs.readdirSync(skillsDir);

    for (const file of skillsFiles) {
      if (file.endsWith('.yml')) {
        const skillFile = path.join(skillsDir, file);
        const yamlString = YAML.parse(fs.readFileSync(skillFile, 'utf8'));
        const input = new Skill(yamlString);
        try {
          await skillsRepo.create(input);
        } catch (e) {
          console.error('Problem while cleaning up pre-migration', e);
        }
      }
    }
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    try {
      await super.migrateSchema(options);
    } catch (e) {
      console.error('Problem while cleaning up pre-migration', e);
    }
    await this.migrateUsers(options);
    await this.migrateSkills(options);
  }
}

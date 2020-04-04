import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {User, UserCredential, Skill} from '../models';
import {MemoryDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {UserCredentialRepository} from './user-credential.repository';
import {SkillRepository} from './skill.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredential,
    typeof User.prototype.id
  >;

  public readonly skills: HasManyRepositoryFactory<
    Skill,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.Memory') dataSource: MemoryDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
    @repository.getter('SkillRepository')
    protected skillRepositoryGetter: Getter<SkillRepository>,
  ) {
    super(User, dataSource);
    this.skills = this.createHasManyRepositoryFactoryFor(
      'skills',
      skillRepositoryGetter,
    );
    this.registerInclusionResolver('skills', this.skills.inclusionResolver);

    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialRepositoryGetter,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredential | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}

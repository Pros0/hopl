import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UserCredential} from './user-credential.model';
import {Skill} from './skill.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  driversLicense?: string;

  @property({
    type: 'string',
  })
  covidStatus?: string;

  @hasOne(() => UserCredential)
  userCredentials: UserCredential;

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  @hasMany(() => Skill)
  skills: Skill[];

  @property({
    type: 'string',
  })
  organisationId?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

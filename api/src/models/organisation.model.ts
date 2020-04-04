import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {SearchProfile} from './search-profile.model';

@model()
export class Organisation extends Entity {
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
  name: string;

  @hasMany(() => User)
  members: User[];

  @hasMany(() => SearchProfile)
  searchProfiles: SearchProfile[];

  constructor(data?: Partial<Organisation>) {
    super(data);
  }
}

export interface OrganisationRelations {
  // describe navigational properties here
}

export type OrganisationWithRelations = Organisation & OrganisationRelations;

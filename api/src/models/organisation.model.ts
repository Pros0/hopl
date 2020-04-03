import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Organisation>) {
    super(data);
  }
}

export interface OrganisationRelations {
  // describe navigational properties here
}

export type OrganisationWithRelations = Organisation & OrganisationRelations;

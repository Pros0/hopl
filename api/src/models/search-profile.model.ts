import {Entity, model, property} from '@loopback/repository';

@model()
export class SearchProfile extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

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


  constructor(data?: Partial<SearchProfile>) {
    super(data);
  }
}

export interface SearchProfileRelations {
  // describe navigational properties here
}

export type SearchProfileWithRelations = SearchProfile & SearchProfileRelations;

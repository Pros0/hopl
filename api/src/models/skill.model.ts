import {Entity, model, property} from '@loopback/repository';

@model()
export class Skill extends Entity {
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

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Skill>) {
    super(data);
  }
}

export interface SkillRelations {
  // describe navigational properties here
}

export type SkillWithRelations = Skill & SkillRelations;

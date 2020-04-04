import {DefaultCrudRepository} from '@loopback/repository';
import {Skill, SkillRelations} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id,
  SkillRelations
> {
  constructor(@inject('datasources.Memory') dataSource: MemoryDataSource) {
    super(Skill, dataSource);
  }
}

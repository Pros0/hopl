import {DefaultCrudRepository} from '@loopback/repository';
import {Organisation, OrganisationRelations} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrganisationRepository extends DefaultCrudRepository<
  Organisation,
  typeof Organisation.prototype.id,
  OrganisationRelations
> {
  constructor(@inject('datasources.Memory') dataSource: MemoryDataSource) {
    super(Organisation, dataSource);
  }
}

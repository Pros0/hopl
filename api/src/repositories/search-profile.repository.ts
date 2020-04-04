import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {SearchProfile, SearchProfileRelations, Organisation} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrganisationRepository} from './organisation.repository';

export class SearchProfileRepository extends DefaultCrudRepository<
  SearchProfile,
  typeof SearchProfile.prototype.id,
  SearchProfileRelations
> {
  public readonly organisation: BelongsToAccessor<
    Organisation,
    typeof SearchProfile.prototype.id
  >;

  constructor(
    @inject('datasources.Memory') dataSource: MemoryDataSource,
    @repository.getter('OrganisationRepository')
    protected organisationRepositoryGetter: Getter<OrganisationRepository>,
  ) {
    super(SearchProfile, dataSource);
    this.organisation = this.createBelongsToAccessorFor(
      'organisation',
      organisationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'organisation',
      this.organisation.inclusionResolver,
    );
  }
}

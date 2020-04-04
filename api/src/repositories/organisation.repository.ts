import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {
  Organisation,
  OrganisationRelations,
  User,
  SearchProfile,
} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {SearchProfileRepository} from './search-profile.repository';

export class OrganisationRepository extends DefaultCrudRepository<
  Organisation,
  typeof Organisation.prototype.id,
  OrganisationRelations
> {
  public readonly members: HasManyRepositoryFactory<
    User,
    typeof Organisation.prototype.id
  >;

  public readonly searchProfiles: HasManyRepositoryFactory<
    SearchProfile,
    typeof Organisation.prototype.id
  >;

  constructor(
    @inject('datasources.Memory') dataSource: MemoryDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('SearchProfileRepository')
    protected searchProfileRepositoryGetter: Getter<SearchProfileRepository>,
  ) {
    super(Organisation, dataSource);
    this.searchProfiles = this.createHasManyRepositoryFactoryFor(
      'searchProfiles',
      searchProfileRepositoryGetter,
    );
    this.registerInclusionResolver(
      'searchProfiles',
      this.searchProfiles.inclusionResolver,
    );
    this.members = this.createHasManyRepositoryFactoryFor(
      'members',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('members', this.members.inclusionResolver);
  }
}

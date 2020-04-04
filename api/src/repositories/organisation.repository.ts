import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {Organisation, OrganisationRelations, User} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class OrganisationRepository extends DefaultCrudRepository<
  Organisation,
  typeof Organisation.prototype.id,
  OrganisationRelations
> {
  public readonly members: HasManyRepositoryFactory<
    User,
    typeof Organisation.prototype.id
  >;

  constructor(
    @inject('datasources.Memory') dataSource: MemoryDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Organisation, dataSource);
    this.members = this.createHasManyRepositoryFactoryFor(
      'members',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('members', this.members.inclusionResolver);
  }
}

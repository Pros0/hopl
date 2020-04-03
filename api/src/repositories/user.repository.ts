import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import { User, UserCredential } from '../models';
import { MemoryDataSource } from '../datasources';
import { Getter, inject } from '@loopback/core';
import { UserCredentialRepository } from './user-credential.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredential, typeof User.prototype.id>;

  constructor(
    @inject('datasources.Memory') dataSource: MemoryDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<
      UserCredentialRepository
    >,
  ) {
    super(User, dataSource);

    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialRepositoryGetter,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredential | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}

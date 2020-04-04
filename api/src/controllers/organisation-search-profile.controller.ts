import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Organisation, SearchProfile} from '../models';
import {OrganisationRepository} from '../repositories';

export class OrganisationSearchProfileController {
  constructor(
    @repository(OrganisationRepository)
    protected organisationRepository: OrganisationRepository,
  ) {}

  @get('/organisations/{id}/search-profiles', {
    responses: {
      '200': {
        description: 'Array of Organisation has many SearchProfile',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SearchProfile)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SearchProfile>,
  ): Promise<SearchProfile[]> {
    return this.organisationRepository.searchProfiles(id).find(filter);
  }

  @post('/organisations/{id}/search-profiles', {
    responses: {
      '200': {
        description: 'Organisation model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(SearchProfile)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Organisation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SearchProfile, {
            title: 'NewSearchProfileInOrganisation',
            exclude: ['id'],
            optional: ['organisationId'],
          }),
        },
      },
    })
    searchProfile: Omit<SearchProfile, 'id'>,
  ): Promise<SearchProfile> {
    return this.organisationRepository.searchProfiles(id).create(searchProfile);
  }

  @patch('/organisations/{id}/search-profiles', {
    responses: {
      '200': {
        description: 'Organisation.SearchProfile PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SearchProfile, {partial: true}),
        },
      },
    })
    searchProfile: Partial<SearchProfile>,
    @param.query.object('where', getWhereSchemaFor(SearchProfile))
    where?: Where<SearchProfile>,
  ): Promise<Count> {
    return this.organisationRepository
      .searchProfiles(id)
      .patch(searchProfile, where);
  }

  @del('/organisations/{id}/search-profiles', {
    responses: {
      '200': {
        description: 'Organisation.SearchProfile DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SearchProfile))
    where?: Where<SearchProfile>,
  ): Promise<Count> {
    return this.organisationRepository.searchProfiles(id).delete(where);
  }
}

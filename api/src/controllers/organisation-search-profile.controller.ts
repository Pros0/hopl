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
import {authenticate} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {authorize} from '@loopback/authorization';
import {basicAuthorization} from '../services/basic.authorizer';

export class OrganisationSearchProfileController {
  constructor(
    @repository(OrganisationRepository)
    protected organisationRepository: OrganisationRepository,
  ) {}

  @get('/organisations/{id}/search-profiles', {
    security: OPERATION_SECURITY_SPEC,
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SearchProfile>,
  ): Promise<SearchProfile[]> {
    return this.organisationRepository.searchProfiles(id).find(filter);
  }

  @post('/organisations/{id}/search-profiles', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Organisation model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(SearchProfile)},
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
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
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Organisation.SearchProfile PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
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
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Organisation.SearchProfile DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SearchProfile))
    where?: Where<SearchProfile>,
  ): Promise<Count> {
    return this.organisationRepository.searchProfiles(id).delete(where);
  }
}

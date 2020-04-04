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
import {User, Skill} from '../models';
import {UserRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {authorize} from '@loopback/authorization';
import {basicAuthorization} from '../services/basic.authorizer';

export class UserSkillController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/skills', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of User has many Skill',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Skill)},
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
    @param.query.object('filter') filter?: Filter<Skill>,
  ): Promise<Skill[]> {
    return this.userRepository.skills(id).find(filter);
  }

  @post('/users/{id}/skills', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Skill)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {
            title: 'NewSkillInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    skill: Omit<Skill, 'id'>,
  ): Promise<Skill> {
    return this.userRepository.skills(id).create(skill);
  }

  @patch('/users/{id}/skills', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Skill PATCH success count',
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
          schema: getModelSchemaRef(Skill, {partial: true}),
        },
      },
    })
    skill: Partial<Skill>,
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where<Skill>,
  ): Promise<Count> {
    return this.userRepository.skills(id).patch(skill, where);
  }

  @del('/users/{id}/skills', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Skill DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where<Skill>,
  ): Promise<Count> {
    return this.userRepository.skills(id).delete(where);
  }
}

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
import {
  User,
  Skill,
} from '../models';
import {UserRepository} from '../repositories';

export class UserSkillController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/skills', {
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
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Skill>,
  ): Promise<Skill[]> {
    return this.userRepository.skills(id).find(filter);
  }

  @post('/users/{id}/skills', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Skill)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {
            title: 'NewSkillInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) skill: Omit<Skill, 'id'>,
  ): Promise<Skill> {
    return this.userRepository.skills(id).create(skill);
  }

  @patch('/users/{id}/skills', {
    responses: {
      '200': {
        description: 'User.Skill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
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
    responses: {
      '200': {
        description: 'User.Skill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where<Skill>,
  ): Promise<Count> {
    return this.userRepository.skills(id).delete(where);
  }
}

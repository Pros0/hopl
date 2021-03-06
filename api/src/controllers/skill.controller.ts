import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Skill} from '../models';
import {SkillRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {authorize} from '@loopback/authorization';
import {basicAuthorization} from '../services/basic.authorizer';

export class SkillController {
  constructor(
    @repository(SkillRepository)
    public skillRepository: SkillRepository,
  ) {}

  @post('/skills', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Skill model instance',
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
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {
            title: 'NewSkill',
            exclude: ['id'],
          }),
        },
      },
    })
    skill: Omit<Skill, 'id'>,
  ): Promise<Skill> {
    return this.skillRepository.create(skill);
  }

  @get('/skills/count', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Skill model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async count(@param.where(Skill) where?: Where<Skill>): Promise<Count> {
    return this.skillRepository.count(where);
  }

  @get('/skills', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Skill model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Skill, {includeRelations: true}),
            },
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
  async find(@param.filter(Skill) filter?: Filter<Skill>): Promise<Skill[]> {
    return this.skillRepository.find(filter);
  }

  @patch('/skills', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Skill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {partial: true}),
        },
      },
    })
    skill: Skill,
    @param.where(Skill) where?: Where<Skill>,
  ): Promise<Count> {
    return this.skillRepository.updateAll(skill, where);
  }

  @get('/skills/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Skill, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Skill, {exclude: 'where'})
    filter?: FilterExcludingWhere<Skill>,
  ): Promise<Skill> {
    return this.skillRepository.findById(id, filter);
  }

  @patch('/skills/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Skill PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {partial: true}),
        },
      },
    })
    skill: Skill,
  ): Promise<void> {
    await this.skillRepository.updateById(id, skill);
  }

  @put('/skills/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Skill PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() skill: Skill,
  ): Promise<void> {
    await this.skillRepository.replaceById(id, skill);
  }

  @del('/skills/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Skill DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'organiser', 'applicant'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.skillRepository.deleteById(id);
  }
}

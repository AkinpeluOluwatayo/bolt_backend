import {
  Controller, Get, Post, Body, Dependencies,
  Bind, Req, HttpCode, Param, Put, Delete,
  UsePipes, ValidationPipe
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateDto } from './dto/CreateDto.dto.js';

@Controller('todos')
@Dependencies(TodosService)
export class TodosController {
  constructor(todosService) {
    this.todosService = todosService;
  }

  @Get()
  async getAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  @Bind(Param('id'), Req())
  async getOne(id, req) {
    const todo = await this.todosService.findOne(id);
    const protocol = req.protocol;
    const host = req.get('host');

    return {
      data: todo,
      links: {
        self: `${protocol}://${host}/todos/${id}`
      }
    };
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({
    expectedType: CreateDto,
    transform: true,
    whitelist: true
  }))
  @Bind(Body(), Req())
  async create(body, req) {
    const newTodo = await this.todosService.create(body);

    const protocol = req.protocol;
    const host = req.get('host');
    const selfLink = `${protocol}://${host}/todos/${newTodo._id}`;

    return {
      statusCode: 201,
      message: 'Todo created successfully!',
      data: newTodo,
      links: {
        self: selfLink
      }
    };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({
    expectedType: CreateDto,
    transform: true,
    whitelist: true,
    skipMissingProperties: true
  }))
  @Bind(Param('id'), Body(), Req())
  async update(id, body, req) {
    const updatedTodo = await this.todosService.update(id, body);
    const protocol = req.protocol;
    const host = req.get('host');

    return {
      message: 'Todo updated successfully!',
      data: updatedTodo,
      links: {
        self: `${protocol}://${host}/todos/${id}`
      }
    };
  }

  @Delete(':id')
  @Bind(Param('id'))
  async remove(id) {
    await this.todosService.delete(id);
    return {
      message: `Todo with ID ${id} deleted successfully`,
      statusCode: 200
    };
  }
}
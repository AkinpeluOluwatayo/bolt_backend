import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
@Dependencies(getModelToken(Todo.name))
export class TodosService {
  constructor(todoModel) {
    this.todoModel = todoModel;
  }

  async findAll() {
    return await this.todoModel.find().exec();
  }

  async findOne(id) {
    return await this.todoModel.findById(id).exec();
  }

  async create(createTodoDto) {
    const newTodo = new this.todoModel(createTodoDto);
    return await newTodo.save();
  }

  async update(id, data) {

    return await this.todoModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id) {
    return await this.todoModel.findByIdAndDelete(id).exec();
  }
}
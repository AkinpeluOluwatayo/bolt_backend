import { Test } from '@nestjs/testing';
import { TodosController } from './todos.controller';

describe('Todos Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TodosController],
    }).compile();

    controller = module.get(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

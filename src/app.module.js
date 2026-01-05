import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Add this
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/todo_db'),

    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
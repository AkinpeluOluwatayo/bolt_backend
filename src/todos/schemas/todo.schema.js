import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {

  @Prop({ type: String, required: true })
  title;

  @Prop({ type: String })
  description;

  @Prop({ type: Boolean, default: false })
  isCompleted;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
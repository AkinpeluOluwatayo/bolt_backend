import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required and cannot be empty' })
  title;

  @IsString()
  @IsOptional()
  description;

  @IsBoolean()
  @IsOptional()
  isCompleted;
}
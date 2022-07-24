import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class User extends Document {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Jairson Mendes',
  })
  name: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: '19 de fevereiro de 1970',
  })
  BirthDate?: Date;
  @ApiProperty({
    description: 'active of the user',
    example: false,
  })
  active?: boolean;
}

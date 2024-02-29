import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Characteristics {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
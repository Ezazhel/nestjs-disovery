import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'the mail used by the user',
  })
  email: string;
}

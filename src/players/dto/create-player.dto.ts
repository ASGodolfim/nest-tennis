import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreatePlayerDto {

  @IsNotEmpty()
  @Matches(/^[0-9]{2} [0-9]{9}$/)
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;
}

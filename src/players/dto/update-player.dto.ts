import { IsNotEmpty, Matches } from 'class-validator';

export class UpdatePlayerDto {

  @IsNotEmpty()
  @Matches(/^[0-9]{2} [0-9]{9}$/)
  readonly phoneNumber: string;

  @IsNotEmpty()
  readonly name: string;
}

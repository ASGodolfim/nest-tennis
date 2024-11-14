import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsNotEmpty } from "class-validator";
import { Players } from "src/players/interface/player.schema";

export class CreateChallengeDto {

    @IsNotEmpty()
    @IsDate()
    dateHourChallenge: Date;

    @IsNotEmpty()
    challenger: Players;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: Array<Players>
}
import { IsNotEmpty } from "class-validator";
import { Result } from "src/challenges/interface/challenge.interface";
import { Players } from "src/players/interface/player.schema";

export class SetChallengeMatchDto {

    @IsNotEmpty()
    winner: Players;

    @IsNotEmpty()
    result: Array<Result>
}
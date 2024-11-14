import { IsNotEmpty } from "class-validator";
import { Result } from "src/challenges/interface/challenge.interface";
import { Players } from "src/players/interface/player.schema";

export class SetChallengeMatchDto {

    @IsNotEmpty()
    def: Players;

    @IsNotEmpty()
    result: Array<Result>
}
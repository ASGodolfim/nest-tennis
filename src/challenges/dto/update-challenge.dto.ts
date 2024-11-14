import { IsNotEmpty } from "class-validator";
import { ChallengeStatus } from "../challenge-status.enum";

export class UpdateChallengeDto {

    @IsNotEmpty()
    status: ChallengeStatus;

}
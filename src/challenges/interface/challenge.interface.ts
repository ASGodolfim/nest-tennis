import { Document } from "mongoose";
import { Player } from "src/players/interface/player.interface";
import { ChallengeStatus } from "../challenge-status.enum";

export interface Challenge extends Document {

    dateHourChallenge: Date;
    status: ChallengeStatus;
    dateHourRequest: Date;
    dateHourResponse: Date;
    challenger: Player;
    category: string;
    players: Array<Player>;
    match: Match;
}

export interface Match extends Document{
    category: string;
    players: Array<Player>;
    winner: Player;
    result: Array<Result>;
}

export interface Result {
    set: string;
}
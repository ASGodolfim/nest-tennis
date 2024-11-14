import * as mongose from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Players } from 'src/players/interface/player.schema';
import { ChallengeStatus } from '../challenge-status.enum';
import { Match } from './challenge.interface';

export type ChallengeDocument = mongose.HydratedDocument<Challenges>

export class Challenges{

    @Prop({type: Date})
    dateHourChallenge: Date;
    
    @Prop({type: ChallengeStatus, default: ChallengeStatus.REQUESTED})
    status: ChallengeStatus;

    @Prop({type: Date, default: Date.now()})
    dateHourRequest: Date;
    
    @Prop({type: Date})
    dateHourResponse: Date;
    
    @Prop({type: mongose.Schema.Types.ObjectId, ref: 'Players'})
    challenger: Players;

    @Prop({type: String})
    category: string;
    
    @Prop({type: mongose.Schema.Types.ObjectId, ref: 'Players'})
    players: Array<Players>;

    @Prop({type: mongose.Schema.Types.ObjectId, ref: 'Match'})
    match: Match;
}


export const ChallengeSchema = SchemaFactory.createForClass(Challenges);
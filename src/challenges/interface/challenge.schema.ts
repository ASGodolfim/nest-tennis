import * as mongose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Players } from 'src/players/interface/player.schema';
import { ChallengeStatus } from '../challenge-status.enum';
import { Game } from './challenge.interface';

export type ChallengeDocument = mongose.HydratedDocument<Challenges>

export class Challenges{

    @Prop({type: Date})
    dateHourChallenge: Date;
    
    @Prop({type: ChallengeStatus})
    status: ChallengeStatus;

    @Prop({type: Date})
    dateHourRequest: Date;
    
    @Prop({type: Date})
    dateHourResponse: Date;
    
    @Prop()
    challenger: Players;

    @Prop({type: String})
    category: string;
    
    @Prop()
    players: Array<Players>;

    @Prop()
    game: Game;
}


export const ChallengeSchema = SchemaFactory.createForClass(Challenges);
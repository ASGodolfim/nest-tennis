import * as mongose from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Players } from 'src/players/interface/player.schema';
import { Result } from 'src/challenges/interface/challenge.interface';


export type MatchDocument = mongose.HydratedDocument<Matches>

export class Matches{

    @Prop({type: String})
    category: string;

    @Prop({type: mongose.Schema.Types.ObjectId, ref: 'Players'})
    players: Array<Players>;
    
    @Prop({type: mongose.Schema.Types.ObjectId, ref: 'Players'})
    def: Players;
    
    @Prop({set: {type: String}})
    result: Array<Result>;
}


export const MatchSchema = SchemaFactory.createForClass(Matches);
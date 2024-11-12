import * as mongose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlayerDocument = mongose.HydratedDocument<Players>

export class Players{

    @Prop({require: true})
    name: String;
    
    @Prop({require: true, unique: true})
    phoneNumber: String;
    
    @Prop({require: true, unique: true})
    email: String;
    
    @Prop({enum: ['F','D','C','B','A','S','Pro'],default: 'F',})
    ranking: String;
    
    @Prop({default: 0})
    rankingPosition: Number
    
    @Prop({default: 'www.google.com.br/foto123.jpg'})
    playerPhoto: String

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: Date.now()})
    updatedAt: Date
}

export const PlayerSchema = SchemaFactory.createForClass(Players);
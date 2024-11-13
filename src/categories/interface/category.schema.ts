import * as mongose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Players } from 'src/players/interface/player.schema';
import { Event } from './category.interface';

export type CategoryDocument = mongose.HydratedDocument<Categories>

export class Categories{

    @Prop({type: String, required: true, unique: true})
    readonly category: string;
    
    @Prop({type: String})
    description: string;
    
    @Prop([{name: {type: String}, operation: {type: String}, value: {type: Number}}])
    events: Array<Event>
    
    @Prop([{type: mongose.Schema.Types.ObjectId, ref: 'Players'}])
    players: Array<Players>

    @Prop({type: Date, default: Date.now()})
    createdAt: Date;

    @Prop({type: Date, default: Date.now()})
    updatedAt: Date;
}


export const CategorySchema = SchemaFactory.createForClass(Categories);
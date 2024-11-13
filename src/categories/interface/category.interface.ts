import { Document } from "mongoose";
import { Players } from "src/players/interface/player.schema";

export interface Categorie extends Document {

    readonly categorie: string;
    description: string;
    events: Array<Event>
    players: Array<Players>}

export interface Event {
    name: string;
    operation: string;
    value: number;
}
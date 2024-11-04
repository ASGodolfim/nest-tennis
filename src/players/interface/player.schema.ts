import * as mongose from 'mongoose';

export const PlayerScema = new mongose.Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    ranking: {
        type: String
    },
    rankingPosition: {
        type: Number
    },
    playerPhoto: {
        type: String
    }
},
{
    timestamps: true,
    collection: 'players'
})


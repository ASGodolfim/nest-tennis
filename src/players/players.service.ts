import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Players } from './interface/player.schema';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Players') private readonly playerModel: Model<Players>) {}

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<Players>{
        const { email, name } = createPlayerDto;

        const playerFound = await this.playerModel.findOne({email});

        if (!playerFound) {
            const player = await this.playerModel.create({createPlayerDto});   
            player.save();
            return player;
        }
        await this.playerModel.findByIdAndUpdate(playerFound.id, { name, updatedAt: Date.now() });
        return playerFound;  
    }

    async getAllPlayers(): Promise<Players[]>{
        const players = await this.playerModel.find();
        return players;
    }

    async findByEmail(email: string): Promise<Players>{
        const playerFound = await this.playerModel.findOne({ email });
        if(!playerFound) throw new NotFoundException('Player not Found');
        return playerFound;
    }

    async findById(id: string): Promise<Players>{
        const playerFound = await this.playerModel.findById(id);
        if(!playerFound) throw new NotFoundException('Player not Found');
        return playerFound;
    }

    async deletePlayer(email: string): Promise<String>{
        const playerFound = this.playerModel.findOneAndDelete({email});
        return 'Delete Successful'
    }

    async deletePlayerById(id: string): Promise<String>{
        const playerFound = this.playerModel.findByIdAndDelete(id);
        return 'Delete Successful'
    }

    async signUp(createPlayerDto: CreatePlayerDto): Promise<Players> {
        const { name, phoneNumber, email } = createPlayerDto;

        const player = await this.playerModel.create({ 
            name,
            phoneNumber,
            email,
         });
        if(!player) throw new BadRequestException('Please provide name email and phone number');
        await player.save();
        return player;
    }

    async updateById(id: string, createPlayerDto: CreatePlayerDto): Promise<Players> {
        const { name } = createPlayerDto;
        const player = await this.playerModel.findByIdAndUpdate(id, { name, updatedAt: Date.now() });
        if(!player) throw new NotFoundException('No Player Found');
        return player;
    }

}

import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/player.interface';
import {v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = []

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void>{
        this.logger.log(`createPlayerDto: ${createPlayerDto}`)
         this.create(createPlayerDto);
    }

    async getAllPlayers(): Promise<Player[]>{
        return await this.players; 
    }

    private create(createPlayerDto: CreatePlayerDto): void {
        const { name, phoneNumber, email } = createPlayerDto;

        const player: Player = { 
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            playerPhoto: 'www.google.com.br/foto123.jpg'
         };
         this.players.push(player);
    }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/player.interface';
import {v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = []

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void>{
        const { email } = createPlayerDto;

        const playerFound = await this.players.find(player => player.email === email);

        if (playerFound) {
            await this.update(playerFound, createPlayerDto);
        } else {
            await this.create(createPlayerDto);   
        }
        
       
         
    }

    async getAllPlayers(): Promise<Player[]>{
        return this.players; 
    }

    async findByEmail(email: string): Promise<Player>{
        const playerFound = this.players.find(player => player.email === email)
        if(playerFound) {
            return playerFound;
        } else {
            throw new NotFoundException('Player not Found')
        }
    }

    async deletePlayer(email): Promise<void>{
        const playerFound = this.players.find(player => player.email === email)
        this. players = this.players.filter(player => player.email !== playerFound.email)
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
         this.logger.log(`createPlayerDto: ${createPlayerDto}`)
         this.players.push(player);
    }

    private update(playerFound: Player ,createPlayerDto: CreatePlayerDto): void {
        const { name } = createPlayerDto;
        playerFound.name = name;
    }

}

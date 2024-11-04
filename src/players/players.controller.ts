import { Body, Controller, Post, Get, Patch } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interface/player.interface';

@Controller('api/v1/players')
export class PlayersController {
    
    constructor(private readonly playerService: PlayersService){}

    @Post()
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto){    
        await this.playerService.createUpdatePlayer(createPlayerDto);
        }
    
    @Get()
    async getPlayers(): Promise<Player[]> {
        return this.playerService.getAllPlayers()
    }
}

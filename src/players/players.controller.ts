import { Body, Controller, Post, Get, Patch, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayersService } from './players.service';
import { Players } from './interface/player.schema';

@Controller('api/v1/players')
export class PlayersController {
    
    constructor(private readonly playerService: PlayersService){}

    @Post('/signupOrUpdate')
    @UsePipes(ValidationPipe)
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Players> {    
        return await this.playerService.createUpdatePlayer(createPlayerDto);
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() createPlayerDto: CreatePlayerDto): Promise<Players> {
        return await this.playerService.signUp(createPlayerDto);
    }
    
    @Get('/:email')
    async getPlayers(@Query('email') email: string): Promise<Players[] | Players> {
        if (email) return await this.playerService.findByEmail(email)
        return await this.playerService.getAllPlayers()
    }

    @Get('/:id')
    async getPlayersById(@Query('id') id: string): Promise<Players> {
        return await this.playerService.findById(id);
    }

    @Patch('/:id')
    async updatePlayers(@Query('id') id: string, createPlayerDto: CreatePlayerDto): Promise<Players>{
        return await this.playerService.updateById(id, createPlayerDto);
    }

    @Delete('/:email')
    async deletePlayer(@Query('email') email: string){
        this.playerService.deletePlayer(email);
    }

    @Delete('/:id')
    async deletePlayerById(@Query('id') id: string){
        this.playerService.deletePlayer(id);
    }
}


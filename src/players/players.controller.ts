import { Body, Controller, Post, Get, Patch, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayersService } from './players.service';
import { Players } from './interface/player.schema';
import { PlayersValidationPipeParameters } from './pipes/players-validation-parameters.pipe'
import { UpdatePlayerDto } from './dto/update-player.dto';

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
    
    @Get('/')
    async getPlayers(): Promise<Players[] | Players> {
        return await this.playerService.getAllPlayers()
    }

    @Get('/:id')
    async getPlayersById(@Query('id', PlayersValidationPipeParameters) id: string): Promise<Players> {
        return await this.playerService.findById(id);
    }
    @Get('/:email')
    async getPlayersByEmail(@Query('email', PlayersValidationPipeParameters) email: string): Promise<Players> {
        return await this.playerService.findByEmail(email);
    }

    @Patch('/:id')
    async updatePlayers(@Query('id', PlayersValidationPipeParameters) id: string, updatePlayerDto: UpdatePlayerDto): Promise<Players>{
        return await this.playerService.updateById(id, updatePlayerDto);
    }

    @Delete('/:email')
    async deletePlayer(@Query('email', PlayersValidationPipeParameters) email: string){
        this.playerService.deletePlayer(email);
    }

    @Delete('/:id')
    async deletePlayerById(@Query('id', PlayersValidationPipeParameters) id: string){
        this.playerService.deletePlayer(id);
    }
}


import { Body, Controller, Get, Injectable, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenges } from './interface/challenge.schema';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {

    constructor(private readonly challengeService: ChallengesService) {}

    @Get('/')
    async getAllChallenges(): Promise<Challenges[]>{
        return this.challengeService.getAllChallenges()
    }

    @Get('/:id')
    async getChallengeByPlayer(@Param('id') id:string): Promise<Challenges> {
        return this.challengeService.getChallengeByPlayer(id)
     }

    @Post('/')
    @UsePipes(ValidationPipe)
    async createChallenge(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenges> {
        return this.challengeService.createChallenge(createChallengeDto)
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async updateChallenge(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto): Promise<Challenges> {
        return this.challengeService.updateChallenge(id, updateChallengeDto);
    }

    @Patch('/:id')
    async deleteChallenge(@Param('id') id: string): Promise<Challenges> {
        return this.challengeService.deleteChallenge(id);
    }

}

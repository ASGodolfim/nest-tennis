import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenges } from './interface/challenge.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeStatus } from './challenge-status.enum';


@Injectable()
export class ChallengesService {
    constructor(@InjectModel('Challenges') private readonly challengeModel: Model<Challenges>,
                    private readonly playerService: PlayersService,
                    private readonly categoryService: CategoriesService) {}

    async createChallenge(createChallengeDto: CreateChallengeDto): Promise<Challenges> {
        const { players, challenger } = createChallengeDto;
        for(var i = 0; i > players.length; i++) {
            let playerCheck = await this.challengeModel.findOne(players[i].email)
            if (!playerCheck) throw new NotFoundException(`Player ${players[i]} Not Found`)
        }
        if ((players[0] === challenger && players[1] !== challenger) 
         || (players[0] !== challenger && players[1] === challenger)) {
            
            const category = await this.categoryService.getCategoryByPlayerEmail(challenger.email.toString());
            if (!category) throw new BadRequestException('Challenger must have a Category')
            const challenge = await this.challengeModel.create(CreateChallengeDto);
            challenge.category = category.category;
            await challenge.save();
            return challenge;
        } else throw new BadRequestException('Challenger must play it`s challenges')
    }

    async getChallengeByPlayer(id: string): Promise<Challenges> {
        const playerFound = await this.playerService.findById(id);
        if (!playerFound) throw new NotFoundException('Player Not Found');
        const challenge = await this.challengeModel.findOne({challenger: id});
        if (!challenge) throw new NotFoundException('Challenge Not Found');
        return challenge;
    }

    async getAllChallenges(): Promise<Challenges[]> {
        const challenges = await this.challengeModel.find();
        return challenges;
    }

    async updateChallenge(id: string, updateChallengeDto: UpdateChallengeDto): Promise<Challenges> {
        const { status } = updateChallengeDto
        if (status === ChallengeStatus.REQUESTED || status === ChallengeStatus.CANCELED) throw new BadRequestException('invalid status');
        const challenge = await this.challengeModel.findById(id);
        if(!challenge) throw new NotFoundException('Challenge Not Found')
        if  ((challenge.status === 'REQUESTED' && (status === 'ACCEPTED' || status === 'DENIED'))){
            const updateChallenge = await this.challengeModel.findByIdAndUpdate(id, {status, dateHourResponse: Date.now()});
            return updateChallenge;
        }
        throw new BadRequestException('invalid status');
    }

    async deleteChallenge(id: string): Promise<Challenges> {
        const challenge = await this.challengeModel.findById(id);
        if (challenge.status === 'DENIED') throw new BadRequestException('Challenge already ended');
        const deleteChallenge = await this.challengeModel.findByIdAndUpdate(id, {status: 'CANCELED'})
        return deleteChallenge;
    }
}

import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { ChallengeSchema } from './interface/challenge.schema';
import { PlayersModule } from 'src/players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name:'Challenges', schema: ChallengeSchema }]), PlayersModule],
  controllers: [ChallengesController],
  providers: [ChallengesService]
})
export class ChallengesModule {}

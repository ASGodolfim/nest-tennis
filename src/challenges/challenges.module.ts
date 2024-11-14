import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { ChallengeSchema } from './interface/challenge.schema';
import { PlayersModule } from 'src/players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports:[MongooseModule.forFeature([{ name:'Challenges', schema: ChallengeSchema }]), PlayersModule, CategoriesModule],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService]
})
export class ChallengesModule {}

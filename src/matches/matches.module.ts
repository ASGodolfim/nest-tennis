import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './interface/matches.schema';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports:[MongooseModule.forFeature([{ name:'Matches', schema: MatchSchema }]), PlayersModule, CategoriesModule],
  providers: [MatchesService],
  controllers: [MatchesController]
})
export class MatchesModule {}

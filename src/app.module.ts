import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { PlayersService } from './players/players.service';
import { PlayersController } from './players/players.controller';
import { Players, PlayerSchema } from './players/interface/player.schema';
import { CategoriesModule } from './categories/categories.module';
import { Categories, CategorySchema } from './categories/interface/category.schema';
import { ChallengesModule } from './challenges/challenges.module';
import { Challenges, ChallengeSchema } from './challenges/interface/challenge.schema';

@Module({
  imports: [PlayersModule, MongooseModule.forRoot('mongodb://localhost/nest', { dbName: 'superrank' }),
    MongooseModule.forFeature([
      {
        name: Players.name,
        schema: PlayerSchema
      },
      {
        name: Categories.name,
        schema: CategorySchema
      },
      {
        name: Challenges.name,
        schema: ChallengeSchema
      }]
    ),
    CategoriesModule,
    ChallengesModule],
  controllers: [AppController, PlayersController],
  providers: [AppService, PlayersService],
})
export class AppModule {}

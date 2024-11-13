import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { PlayersService } from './players/players.service';
import { PlayersController } from './players/players.controller';
import { Players, PlayerSchema } from './players/interface/player.schema';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PlayersModule, MongooseModule.forRoot('mongodb://localhost/nest', { dbName: 'superrank' }),
    MongooseModule.forFeature([
      {
        name: Players.name,
        schema: PlayerSchema
      },]
    ),
    CategoriesModule],
  controllers: [AppController, PlayersController],
  providers: [AppService, PlayersService],
})
export class AppModule {}

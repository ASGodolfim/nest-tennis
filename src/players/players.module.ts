import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interface/player.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name:'Players', schema: PlayerSchema }])],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}

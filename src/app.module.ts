import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { PlayersService } from './players/players.service';
import { PlayersController } from './players/players.controller';

@Module({
  imports: [PlayersModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, PlayersController],
  providers: [AppService, PlayersService],
})
export class AppModule {}

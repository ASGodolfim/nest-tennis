import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './interface/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersService } from 'src/players/players.service';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports:[MongooseModule.forFeature([{ name:'Categories', schema: CategorySchema }]), PlayersModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService]
})
export class CategoriesModule {}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from './interface/category.schema';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel('Categories') private readonly categoryModel: Model<Categories>) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Categories> {
        const { category } = createCategoryDto;
        const categoryFound = await this.categoryModel.findOne({category})
        if(categoryFound) throw new BadRequestException(`Category ${category} already exists`);
        const categoryCreate = await this.categoryModel.create(createCategoryDto);
        await categoryCreate.save();
        return categoryCreate;
    }

    async getAllCategory(): Promise<Array<Categories>> {
        return await this.categoryModel.find().populate('players');
    }

    async getCategoryById(id: string): Promise<Categories> {
        const categoryFound = await this.categoryModel.findById(id);
        if(!categoryFound) throw new NotFoundException(`Category of id ${id} Not Found`);
        return categoryFound;
    }

    async getCategoryByName(category: string): Promise<Categories> {
        const categoryFound = await this.categoryModel.findOne({category});
        if(!categoryFound) throw new NotFoundException(`Category ${category} Not Found`);
        return categoryFound;
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Categories> {
        const categoryFound = await this.categoryModel.findByIdAndUpdate(id, {$set: updateCategoryDto, updatedAt: Date.now()});
        if(!categoryFound) throw new NotFoundException(`Category of id ${id} Not Found`);
        return categoryFound;
    }

    async setPlayerCategory(params: string[]): Promise<void> {
        const category = params['category'];
        const playerId = params['playerId'];

        const categoryFound = await this.categoryModel.findOne({category: category});
        if (!categoryFound) throw new BadRequestException(`No Category ${category} registred`);
        
        categoryFound.players.push(playerId)
        await this.categoryModel.findOneAndUpdate({category},{$set: categoryFound, updatedAt: Date.now()});
        
        //const playerFound = await this.


    }
}

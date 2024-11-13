import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from './interface/category.schema';
import { Model } from 'mongoose';

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

    async getAllCategory(): Promise<Array<Categories>>{
        return await this.categoryModel.find();
    }
}

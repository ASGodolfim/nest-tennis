import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getAllCategory(): Promise<Array<Categories>> {
        return await this.categoryModel.find();
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
}

import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './interface/category.schema';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories>{
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    async getAllCategories(): Promise<Array<Categories>>{
        return await this.categoriesService.getAllCategory();    }
}

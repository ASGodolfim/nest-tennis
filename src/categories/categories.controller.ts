import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './interface/category.schema';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post('/')
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories>{
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get('/')
    @UsePipes(ValidationPipe)
    async getAllCategories(): Promise<Array<Categories>> {
        return await this.categoriesService.getAllCategory();
    }

    @Get('/:id')
    @UsePipes(ValidationPipe)
    async getCategoryById(@Param('id') id: string): Promise<Categories> {
        return await this.categoriesService.getCategoryById(id);
    }

    @Get('/:category')
    @UsePipes(ValidationPipe)
    async getCategoryByName(@Param('category') category: string): Promise<Categories> {
        return await this.categoriesService.getCategoryByName(category);
    }
}

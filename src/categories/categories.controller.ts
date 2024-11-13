import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './interface/category.schema';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

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

    @Post('/')
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories>{
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto,  id: string): Promise<Categories> {
        return this.categoriesService.updateCategory(id, updateCategoryDto);

    }

}

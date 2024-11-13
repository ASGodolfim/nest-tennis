import { Body, Controller, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './interface/category.schema';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('/')
    async getAllCategories(): Promise<Array<Categories>> {
        return await this.categoriesService.getAllCategory();
    }

    @Get('/:id')
    async getCategoryById(@Param('id') id: string): Promise<Categories> {
        return await this.categoriesService.getCategoryById(id);
    }

    @Get('/:category')
    async getCategoryByName(@Param('category') category: string): Promise<Categories> {
        return await this.categoriesService.getCategoryByName(category);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories>{
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Post('/:category/players/:playerId')
    @UsePipes(ValidationPipe)
    async setPlayerCategory(@Param() params: string[]): Promise<void> {
        return await this.categoriesService.setPlayerCategory(params);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto,  id: string): Promise<Categories> {
        return this.categoriesService.updateCategory(id, updateCategoryDto);

    }

}

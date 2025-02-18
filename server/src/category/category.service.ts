import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto, id: number) {
        const categoryExist = await this.categoryRepository.findBy({
            user: { id },
            title: createCategoryDto.title,
        });

        if (categoryExist.length)
            throw new BadRequestException('This Category Already Exist');

        const newCategory = {
            title: createCategoryDto.title,
            user: {
                id,
            },
        };

        return await this.categoryRepository.save(newCategory);
    }

    async findAll(id: number) {
        return await this.categoryRepository.find({
            where: {
                user: { id },
            },
            relations: {
                transactions: true,
            },
        });
    }

    async findOne(id: number) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: {
                user: true,
                transactions: true
            },
        });

        if(!category) throw new NotFoundException("Category Not Found")

        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        
        const category = await this.categoryRepository.findOne({
            where: { id }
        })

        if (!category) throw new NotFoundException("Category Not Found")

        return await this.categoryRepository.update(id, updateCategoryDto)
        
    }

    async remove(id: number) {
        const category = await this.categoryRepository.findOne({
            where: { id }
        })

        if(!category) throw new NotFoundException("Category Not Found")

        return await this.categoryRepository.delete(id)

        return `This action removes a #${id} category`;
    }
}

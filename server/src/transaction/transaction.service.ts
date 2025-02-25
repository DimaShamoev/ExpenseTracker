import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) {}

    async create(createTransactionDto: CreateTransactionDto, id: number) {
        const newTransaction = {
            title: createTransactionDto.title,
            amount: createTransactionDto.amount,
            type: createTransactionDto.type,
            user: { id },
            category: { id: +createTransactionDto.category },
        };

        if (!newTransaction)
            throw new BadRequestException("Can't Create New Transaction");

        return await this.transactionRepository.save(newTransaction);
    }

    async findAll(id: number) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: { id },
            },
            relations: {
                category: true
            },
            order: {
                createdAt: 'DESC',
            },
        });

        return transactions;
    }

    async findOne(id: number) {
        const transaction = await this.transactionRepository.findOne({
            where: {
                id,
            },
            relations: {
                user: true,
                category: true,
            },
        });

        if (!transaction) throw new NotFoundException("Can't Find Transaction");

        return transaction;
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        const transaction = await this.transactionRepository.findOne({
            where: {
                id,
            },
        });

        if (!transaction) throw new NotFoundException("Can't Find Transaction");

        return await this.transactionRepository.update(
            id,
            updateTransactionDto,
        );
    }

    async remove(id: number) {
        const transaction = await this.transactionRepository.findOne({
            where: {
                id,
            },
        });

        if (!transaction) throw new NotFoundException("Can't Find Transaction");

        await this.transactionRepository.delete(id);

        return transaction;
    }

    async findAllWithPagination(id: number, page: number, limit: number) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: { id },
            },
            relations: {
                category: true,
                user: true
            },
            order: {
                createdAt: 'DESC'
            },
            take: limit,
            skip: (page - 1) * limit,
        });

        return transactions;
    }

    async findAllByType(id: number, type: string) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: { id },
                type
            }
        })

        const total = transactions.reduce((acc, obj) => acc + obj.amount, 0)

        return total;

    }

}

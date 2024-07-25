import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const count = await this.product.count({ where: { available: true } });

    const lastPage = Math.ceil(count / limit);

    const data = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { available: true },
    });

    return {
      data,
      meta: {
        page,
        limit,
        count,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id, available: true },
    });

    if (!product) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Product with id #${id} not found`,
      });
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const { id: _, ...data } = updateProductDto;

    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.product.update({
      where: { id },
      data: { available: false },
    });

    return product;
  }

  async validateProducts(ids: number[]) {
    ids = Array.from(new Set(ids));

    const products = await this.product.findMany({
      where: { id: { in: ids } },
    });

    if (products.length !== ids.length) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Some products were not found`,
      });
    }

    return products;
  }
}

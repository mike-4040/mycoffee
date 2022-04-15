import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

import { CoffeesService } from './coffees.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeeService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log('CoffeesController instantiated', this.request.body);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.coffeeService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const coffee = this.coffeeService.findOne(id.toString());
    if (!coffee) {
      throw new NotFoundException('not found');
    }
    return coffee;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}

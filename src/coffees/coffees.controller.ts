import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

import { CoffeesService } from './coffees.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';

@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeeService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log('CoffeesController instantiated', this.request.body);
  }

  @Public()
  @Get()
  findAll(
    @Protocol(99) protocol: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    console.log(protocol);
    return this.coffeeService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
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
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCoffeeDto } from 'src/coffes/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffes/dto/update-coffee.dto';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(/* @Query() pagination */) {
    // const { limit = 1, offset = 2 } = pagination;
    return this.coffeeService.findAll();
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

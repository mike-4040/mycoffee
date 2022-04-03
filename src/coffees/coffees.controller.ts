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
  findOne(@Param('id') idd: string) {
    const coffee = this.coffeeService.findOne(idd);
    if (!coffee) {
      throw new NotFoundException('not found');
    }
    return coffee;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return this.coffeeService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { a: string }) {
    return this.coffeeService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}

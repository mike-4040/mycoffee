import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Injectable()
class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}
@Module({
  exports: [CoffeesService],
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (brandsFactory: CoffeeBrandsFactory) =>
        await Promise.resolve(brandsFactory.create()),
      inject: [CoffeeBrandsFactory],
    },
  ],
})
export class CoffeesModule {}

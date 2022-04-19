import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    CoffeesModule,
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432, // database host
      username: 'postgres', // username
      password: 'pass123', // user password
    }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}

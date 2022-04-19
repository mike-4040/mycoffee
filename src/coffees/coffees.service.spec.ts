import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository: MockRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('the coffee with id exists', () => {
      it('should return coffee object', async () => {
        const coffeId = '1';
        const expectedCoffee = {};

        mockRepository.findOne.mockResolvedValue(expectedCoffee);

        const coffee = await service.findOne(coffeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('the coffee with id is notexists', () => {
      it('should throw exaptions', async () => {
        const coffeId = '1';

        mockRepository.findOne.mockResolvedValue(undefined);

        expect.assertions(4);

        await expect(service.findOne(coffeId)).rejects.toMatchInlineSnapshot(
          `[NotFoundException: Coffee #1 not found]`,
        );

        service
          .findOne(coffeId)
          .catch(err =>
            expect(err.message).toMatchInlineSnapshot(`"Coffee #1 not found"`),
          );

        try {
          await service.findOne(coffeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toMatchInlineSnapshot(`"Coffee #1 not found"`);
        }
      });
    });
  });
});

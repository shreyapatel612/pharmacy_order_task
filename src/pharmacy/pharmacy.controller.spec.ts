import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PharmacyService } from './pharmacy.service';
import { PharmacyController } from './pharmacy.controller';

jest.mock('./pharmacy.service');

describe('PharmacyController', () => {
  let app: INestApplication;
  let externalService: PharmacyService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyController],
      providers: [PharmacyService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    externalService = moduleFixture.get<PharmacyService>(PharmacyService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/should get all data of Pharmacy', async () => {
    const testData = {
      data: [
        {
          integrationName: 'healthmart',
          name: 'HealthMart Pharmacy',
          address: '123 Main St',
          city: 'Cityville',
          state: 'Stateville',
          zipcode: '12345',
          country: 'Countryland',
          fax: '123-456-7890',
          phone: '987-654-3210',
        },
      ],
    };
    jest.spyOn(externalService, 'findAll').mockResolvedValue(testData);

    return request(app.getHttpServer()).get('/pharmacy').expect(200);
  });
});

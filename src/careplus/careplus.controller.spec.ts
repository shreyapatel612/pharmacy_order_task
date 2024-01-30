import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CareplusController } from './careplus.controller';
import { CareplusService } from './careplus.service';
jest.mock('./careplus.service');

describe('CareplusController', () => {
  let app: INestApplication;
  let externalService: CareplusService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CareplusController],
      providers: [CareplusService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    externalService = moduleFixture.get<CareplusService>(CareplusService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/should get all data of careplus', async () => {
    const testData = {
      data: [
        {
          carePlusId: '1692336512616',
          carePlusProduct: 'Antibiotics',
          carePlusQuantity: 2,
          carePlusClientInfo: {
            carePlusClientName: 'Jane Smith',
            carePlusClientAddress: '456 Elm Street',
            carePlusClientCity: 'Townville',
            carePlusClientState: 'State',
            carePlusClientZipcode: '54321',
            carePlusClientCountry: 'Country',
          },
        },
      ],
    };
    jest.spyOn(externalService, 'findAll').mockResolvedValue(testData);

    return request(app.getHttpServer()).get('/careplus').expect(200);
  });

  it('/should fetch data for a specific orderId', async () => {
    const id = '1692336512616';
    const testData = {
      carePlusId: '1692336512616',
      carePlusProduct: 'Antibiotics',
      carePlusQuantity: 2,
      carePlusClientInfo: {
        carePlusClientName: 'Jane Smith',
        carePlusClientAddress: '456 Elm Street',
        carePlusClientCity: 'Townville',
        carePlusClientState: 'State',
        carePlusClientZipcode: '54321',
        carePlusClientCountry: 'Country',
      },
    };

    jest.spyOn(externalService, 'findOne').mockResolvedValue(testData);
    return request(app.getHttpServer()).get(`/careplus/${id}`).expect(200);
  });

  it('/should create order for careplus', async () => {
    const orderData = {
      carePlusProduct: 'Antibiotics',
      carePlusQuantity: 12,
      carePlusClientInfo: {
        carePlusClientName: 'John Doe',
        carePlusClientAddress: '2170 Main Street',
        carePlusClientCity: 'Mississauga',
        carePlusClientState: 'ON',
        carePlusClientZipcode: '12345',
        carePlusClientCountry: 'Canada',
      },
    };

    const mockedResponse = {
      status: 'SUCCEESS',
      message: 'Successfully Inserted!',
      data: {
        carePlusId: '1691622645897',
        carePlusProduct: 'Painkiller',
        carePlusQuantity: 12,
        carePlusClientInfo: {
          carePlusClientName: 'John Doe',
          carePlusClientAddress: '2170 Main Street',
          carePlusClientCity: 'Mississauga',
          carePlusClientState: 'ON',
          carePlusClientZipcode: '12345',
          carePlusClientCountry: 'Canada',
        },
      },
    };

    jest.spyOn(externalService, 'create').mockResolvedValue(mockedResponse);

    return request(app.getHttpServer())
      .post('/careplus')
      .send(orderData)
      .expect(201);
  });
});

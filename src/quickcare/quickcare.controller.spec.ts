import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { QuickcareController } from './quickcare.controller';
import { QuickcareService } from './quickcare.service';
jest.mock('./quickcare.service');

describe('QuickcareController', () => {
  let app: INestApplication;
  let externalService: QuickcareService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [QuickcareController],
      providers: [QuickcareService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    externalService = moduleFixture.get<QuickcareService>(QuickcareService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/should get all data of quickcare', async () => {
    const testData = {
      data: [
        {
          quickCareId: '12131242342',
          quickCareProduct: 'Cold Medicine',
          quickCareQuantity: 1,
          quickCareUserData: {
            quickCareUserName: 'Alice Johnson',
            quickCareUserAddress: '789 Oak Avenue',
            quickCareUserCity: 'Villageville',
            quickCareUserState: 'State',
            quickCareUserZipcode: '98765',
            quickCareUserCountry: 'Country',
          },
        },
      ],
    };
    jest.spyOn(externalService, 'findAll').mockResolvedValue(testData);

    return request(app.getHttpServer()).get('/quickcare').expect(200);
  });

  it('/should fetch data for a specific orderId', async () => {
    // Assuming your external API is accessible during the test
    const id = '1692336512616'; // Replace with a valid ID
    const testData = {
      quickCareId: '12131242342',
      quickCareProduct: 'Cold Medicine',
      quickCareQuantity: 1,
      quickCareUserData: {
        quickCareUserName: 'Alice Johnson',
        quickCareUserAddress: '789 Oak Avenue',
        quickCareUserCity: 'Villageville',
        quickCareUserState: 'State',
        quickCareUserZipcode: '98765',
        quickCareUserCountry: 'Country',
      },
    };

    jest.spyOn(externalService, 'findOne').mockResolvedValue(testData);
    return request(app.getHttpServer()).get(`/quickcare/${id}`).expect(200);
  });

  it('/should create order for quickcare', async () => {
    const orderData = {
      quickCareProduct: 'Cold Medicine',
      quickCareQuantity: 1,
      quickCareUserData: {
        quickCareUserName: 'Alice Johnson',
        quickCareUserAddress: '789 Oak Avenue',
        quickCareUserCity: 'Villageville',
        quickCareUserState: 'State',
        quickCareUserZipcode: '98765',
        quickCareUserCountry: 'Country',
      },
    };

    const mockedResponse = {
      status: 'SUCCEESS',
      message: 'Successfully Inserted!',
      data: {
        quickCareId: '1691622645897',
        quickCareProduct: 'Cold Medicine',
        quickCareQuantity: 1,
        quickCareUserData: {
          quickCareUserName: 'Alice Johnson',
          quickCareUserAddress: '789 Oak Avenue',
          quickCareUserCity: 'Villageville',
          quickCareUserState: 'State',
          quickCareUserZipcode: '98765',
          quickCareUserCountry: 'Country',
        },
      },
    };

    jest.spyOn(externalService, 'create').mockResolvedValue(mockedResponse);

    return request(app.getHttpServer())
      .post('/quickcare')
      .send(orderData)
      .expect(201);
  });
});

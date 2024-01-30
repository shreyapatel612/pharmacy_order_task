import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HealthmartService } from './healthmart.service';
import { HealthmartController } from './healthmart.controller';

jest.mock('./healthmart.service');

describe('HealthmartController', () => {
  let app: INestApplication;
  let externalService: HealthmartService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthmartController],
      providers: [HealthmartService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    externalService = moduleFixture.get<HealthmartService>(HealthmartService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/should get all data of Healthcare', async () => {
    const testData = {
      data: [
        {
          healthMartId: '1691622645898',
          healthMartProduct: 'Painkiller',
          healthMartQuantity: 3,
          healthMartCustomerInfo: {
            healthMartCustName: 'John Doe',
            healthMartCustAddress: '123 Main Street',
            healthMartCustCity: 'Cityville',
            healthMartCustState: 'State',
            healthMartCustZipcode: '12345',
            healthMartCustCountry: 'Country',
          },
        },
      ],
    };
    jest.spyOn(externalService, 'findAll').mockResolvedValue(testData);

    return request(app.getHttpServer()).get('/healthmart').expect(200);
  });

  it('/should fetch data for a specific orderId', async () => {
    // Assuming your external API is accessible during the test
    const id = '1691622645898'; // Replace with a valid ID
    const testData = {
      healthMartId: '1691622645898',
      healthMartProduct: 'Painkiller',
      healthMartQuantity: 3,
      healthMartCustomerInfo: {
        healthMartCustName: 'John Doe',
        healthMartCustAddress: '123 Main Street',
        healthMartCustCity: 'Cityville',
        healthMartCustState: 'State',
        healthMartCustZipcode: '12345',
        healthMartCustCountry: 'Country',
      },
    };

    jest.spyOn(externalService, 'findOne').mockResolvedValue(testData);
    return request(app.getHttpServer()).get(`/healthmart/${id}`).expect(200);
  });

  it('/should create order for healthmart', async () => {
    const orderData = {
      healthMartProduct: 'Painkiller',
      healthMartQuantity: 12,
      healthMartCustomerInfo: {
        healthMartCustName: 'John Doe',
        healthMartCustAddress: '2170 Main Street',
        healthMartCustCity: 'Mississauga',
        healthMartCustState: 'ON',
        healthMartCustZipcode: '12345',
        healthMartCustCountry: 'Canada',
      },
    };

    const mockedResponse = {
      status: 'SUCCEESS',
      message: 'Successfully Inserted!',
      data: {
        healthMartId: '1691622645897',
        healthMartProduct: 'Painkiller',
        healthMartQuantity: 12,
        healthMartCustomerInfo: {
          healthMartCustName: 'John Doe',
          healthMartCustAddress: '2170 Main Street',
          healthMartCustCity: 'Mississauga',
          healthMartCustState: 'ON',
          healthMartCustZipcode: '12345',
          healthMartCustCountry: 'Canada',
        },
      },
    };

    jest.spyOn(externalService, 'create').mockResolvedValue(mockedResponse);

    return request(app.getHttpServer())
      .post('/healthmart')
      .send(orderData)
      .expect(201);
  });
});

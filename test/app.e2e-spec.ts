import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import authService from '../src/auth/auth-service';
import { JWT_TYPE } from '../src/auth/const';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../src/user/user-service';

const validBasicAuth = `Basic ${Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64')}`;
const invalidBasicAuth = `Basic ${Buffer.from(`${ADMIN_USERNAME}:notQuiteReal`).toString('base64')}`;
const validRefreshToken = authService.generateToken(JWT_TYPE.REFRESH, 'admin');
const invalidRefreshToken = authService.generateToken(JWT_TYPE.REFRESH, 'admin', 'notSecret');

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/token (POST) - create token while not authorized', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .expect(403)
  });

  it('/auth/token (POST) - create access token with valid refresh token', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .send({ tokenType: JWT_TYPE.ACCESS })
      .set('Authorization', `Bearer ${validRefreshToken}`)
      .expect(201)
  });

  it('/auth/token (POST) - create access token with invalid refresh token', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .send({ tokenType: JWT_TYPE.ACCESS })
      .set('Authorization', `Bearer ${invalidRefreshToken}`)
      .expect(401)
  });

  it('/auth/token (POST) - create refresh token with valid basic auth', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .send({ tokenType: JWT_TYPE.REFRESH })
      .set('Authorization', validBasicAuth)
      .expect(201)
  });

  it('/auth/token (POST) - create refresh token with invalid basic auth', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .send({ tokenType: JWT_TYPE.REFRESH })
      .set('Authorization', invalidBasicAuth)
      .expect(403)
  });
});

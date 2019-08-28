import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientHttp2Session } from 'http2';
import AuthController from './auth/auth-controller';
import { AuthMiddleware } from './auth/auth-middleware';
import { BookingController } from './booking/booking-controller';

@Module({
  imports: [],
  controllers: [AuthController, BookingController],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}

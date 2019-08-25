import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AuthController from './auth/auth-controller';
import { AuthMiddleware } from './auth/auth-middleware';
import { ExampleController } from './example/example-controller';
import { BookingController } from './booking/booking-controller';

@Module({
  imports: [],
  controllers: [ExampleController, AuthController, BookingController],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}

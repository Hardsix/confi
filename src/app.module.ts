import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AuthController from './auth.module/auth-controller';
import { AuthMiddleware } from './auth.module/auth-middleware';
import { ExampleController } from './example.module/example-controller';

@Module({
  imports: [],
  controllers: [ExampleController, AuthController],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}

import { Module } from '@nestjs/common';
import { HelloController } from './hello.module/hello.controller';
import { HelloService } from './hello.module/hello.service';
import { ExampleController } from './example.module/example-controller';

@Module({
  imports: [],
  controllers: [HelloController, ExampleController],
  providers: [HelloService],
})

export class AppModule {}

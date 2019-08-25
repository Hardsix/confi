import { Module } from '@nestjs/common';
import { HelloController } from './hello.module/hello.controller';
import { HelloService } from './hello.module/hello.service';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})

export class AppModule {}

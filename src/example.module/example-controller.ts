import {
  Body,
  Controller,
  Post,
  Req,
  Get,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { getManager } from 'typeorm';
import { ExampleModel } from './example-model';
import { Request } from 'express';

@Controller('examples')
export class ExampleController {
  @ApiResponse({ type: ExampleModel, status: 201 })
  @Post()
  async create(@Body() exampleData: ExampleModel, @Req() request: Request) {
    const example = new ExampleModel();
    example.name = exampleData.name;
    const manager = getManager();

    return await manager.save(example);
  }

  @ApiResponse({ type: ExampleModel, status: 200, isArray: true })
  @Get()
  async findAll() {
    const manager = getManager();
    const examples = await manager.find(ExampleModel);

    return examples;
  }
}

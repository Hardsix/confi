import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Delete,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { getManager } from 'typeorm';
import { BookingModel } from './booking-model';
import { IsAuthenticatedGuard } from '../auth/is-authenticated-guard';

@Controller('bookings')
export class BookingController {
  @ApiResponse({ type: BookingModel, status: 201 })
  @Post()
  async create(@Body() data: BookingModel, @Req() request: Request) {
    const manager = getManager();

    const booking = new BookingModel();
    booking.firstName = data.firstName;
    booking.lastName = data.lastName;
    booking.email = data.email;
    booking.phoneNumber = data.phoneNumber;

    return await manager.save(booking);
  }

  @ApiResponse({ type: BookingModel, status: 200, isArray: true })
  @Get()
  @UseGuards(IsAuthenticatedGuard)
  async findAll() {
    const manager = getManager();
    const bookings = await manager.find(BookingModel);

    return bookings;
  }

  @ApiResponse({ status: 204 })
  @Delete(':id')
  @UseGuards(IsAuthenticatedGuard)
  async delete(@Param() params) {
    const manager = getManager();
    const id = params.id;

    const booking = await manager.findOne(BookingModel, id);
    if (!booking) {
      throw new NotFoundException();
    }

    await manager.remove(BookingModel, booking);
  }
}

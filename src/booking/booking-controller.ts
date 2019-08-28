import _ from 'lodash';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { validate, } from 'class-validator';
import { Request } from 'express';
import { getManager } from 'typeorm';
import UUID from 'uuid/v1';
import { IsAuthenticatedGuard } from '../auth/is-authenticated-guard';
import { BookingModel } from './booking-model';
import { ValidationError } from '../shared/error/errors';

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

    booking.confirmationCode = UUID();

    const errors = await validate(booking);
    if (errors.length > 0) {
      const invalidFields = _.map(errors, e => `'${e.property}'`);
      const fieldList = _.join(invalidFields, ', ');
      throw new ValidationError(`Fields invalid: ${fieldList}`);
    } else {
      return await manager.save(booking);
    }
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

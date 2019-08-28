import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsPhoneNumber } from 'class-validator';

@Entity({ name: 'booking' })
export class BookingModel {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column()
  firstName: string;

  @ApiModelProperty()
  @Column()
  lastName: string;

  @ApiModelProperty()
  @IsEmail()
  @Column()
  email: string;

  @ApiModelProperty()
  @IsPhoneNumber(null)
  @Column()
  phoneNumber: string;
}

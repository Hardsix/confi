import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  email: string;

  @ApiModelProperty()
  @Column()
  phoneNumber: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Climate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locationName: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @Column('jsonb')
  forecast: Forecast[];
}

export interface Forecast {
  date: string;
  day: Day;
  hour: Hour[];
}

export interface Day {
  condition: Condition;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  humidity: number;
  cloud: number;
}

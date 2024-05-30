import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('climate')
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
}

export interface Day {
  condition: Condition;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('traffic')
export class Traffic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  routes: Route[];
}

export interface Route {
  summary: Summary;
  legs: Leg[];
}

export interface Summary {
  lengthInMeters: number;
  travelTimeInSeconds: number;
  trafficDelayInSeconds: number;
  trafficLengthInMeters: number;
  departureTime: string;
  arrivalTime: string;
}

export interface Leg {
  summary: Summary;
}

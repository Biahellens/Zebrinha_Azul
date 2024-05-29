import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Climate } from '../entities/Climate';


export class ClimateController {
  static async getAll(req: Request, res: Response) {
    try {
      const climate = getRepository(Climate).find();
      return res.status(200).json({ climate });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

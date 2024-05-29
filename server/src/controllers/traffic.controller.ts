import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Traffic } from '../entities/Traffic';


export class TrafficController {
  static async getAll(req: Request, res: Response) {
    try {
      const traffics = getRepository(Traffic).find();
      return res.status(200).json({ traffics });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

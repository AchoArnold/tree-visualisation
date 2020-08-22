import { ItemsRepository } from '../Repositories/ItemsRepository';
import { Request, Response } from 'express';
import { ControllerResponse } from './BaseController';

export class ItemsController {
    itemsRepository: ItemsRepository;
    constructor(itemsRepository: ItemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    index(): ControllerResponse {
        return async (request: Request, response: Response) => {
            response.json(await this.itemsRepository.load());
        };
    }
}

import {Request, Response} from "express";

export type ControllerResponse = (request:Request, response: Response) => void
import { feedbackDto } from './dto/feedback_dto';
// import { NextFunction, Request, Response} from "express";
import { Message } from './feedback_entity';
import { ComicsOptions } from './comics_options';
import { json } from 'express';

export class Feedback {
	async feedback({ email, message }: feedbackDto): Promise<void> {
		const newMessage = new Message(email, message);
		// const newMes = await newMessage.json();
		// return newMes;
	}
}

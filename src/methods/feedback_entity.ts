export class Message {
	constructor(private readonly _email: string, private readonly _message: string) {}
	get email(): string {
		return this._email;
	}
	get message(): string {
		return this._message;
	}
}

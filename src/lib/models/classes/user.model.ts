import type { IUser } from '$models/interfaces/user.interface';
import type { IDeserializable } from '$models/interfaces/deserializable.interface';

import { Md5 } from 'ts-md5';

export class UserModel implements IDeserializable<IUser>, IUser {
	public name: string;
	public email: string;
	public id: string;

	public getEmailMd5Hash = () => Md5.hashStr(this.email);

	deserialize(input: IUser): this {
		Object.assign(this, input);
		return this;
	}
}

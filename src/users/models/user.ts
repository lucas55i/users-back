import { Document } from 'mongoose';

export class User extends Document {
  name: string;
  BirthDate: Date;
  active: boolean;
}

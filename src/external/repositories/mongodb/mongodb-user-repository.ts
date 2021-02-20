import { UserData } from '@/entities';
import { MongoHelper } from '@/external/repositories/mongodb/helper';
/* eslint-disable class-methods-use-this */
import { UserRepository } from '@/usecases/add-user-mailing-list/ports';

export class MongodbUserRepository implements UserRepository {
  async add(user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection('users');
    const exists = await this.exists(user);
    if (!exists) {
      await userCollection.insertOne(user);
    }
  }

  async findUserByEmail(email: string): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users');

    return userCollection.findOne({ email });
  }

  async findAllUsers(): Promise<UserData[]> {
    return MongoHelper.getCollection('users').find().toArray();
  }

  async exists(user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email);

    return !!result;
  }
}

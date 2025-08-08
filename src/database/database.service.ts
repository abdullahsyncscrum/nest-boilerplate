import { Injectable, BadRequestException } from '@nestjs/common';
import { Connection, ClientSession } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

type TransactionCallback<T> = (session: ClientSession) => Promise<T>;

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async runWithTransaction<T>(callback: TransactionCallback<T>): Promise<T> {
    const session = await this.connection.startSession();

    try {
      let result: T;

      await session.withTransaction(async () => {
        result = await callback(session);
      });

      return result!;
    } catch (e) {
      throw new BadRequestException(e.message || e || 'Transaction failed');
    } finally {
      session.endSession();
    }
  }
}

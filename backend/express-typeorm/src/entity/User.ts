import { IsEmail, validate } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  ValueTransformer,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import crypto from 'crypto';
import util from 'util';
import { AccessToken } from './AccessToken';
import { HttpException } from '../errors/httpException';

export const lowercase: ValueTransformer = {
  to: (entityValue: string) => entityValue.toLocaleLowerCase(),
  from: (databaseValue: string) => databaseValue,
};

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ transformer: [lowercase] })
  @Index({ unique: true })
  @IsEmail()
    email!: string;

  @Column({ nullable: true })
    password!: string;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @OneToMany(() => AccessToken, (accessToken) => accessToken.id)
    accessTokens!: AccessToken[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const errors = await validate(this);
    if (errors.length) {
      throw new HttpException(400, 'Validation failed');
    }
  }

  async generateAccessToken(): Promise<AccessToken> {
    const userTokens = await AccessToken.count({
      where: {
        user: {
          id: this.id,
        },
      },
      relations: {
        user: true,
      },
    });

    if (userTokens > 5) {
      AccessToken.createQueryBuilder()
        .delete()
        .from(AccessToken)
        .where(
          (qb) =>
            `id IN (${qb.createQueryBuilder().select('id').from(AccessToken, 'at').where('userId = :userId').orderBy('expiresAt', 'ASC').limit(1).getQuery()})`,
        )
        .setParameters({ userId: this.id })
        .execute();
    }

    const randomBytes = util.promisify(crypto.randomBytes);
    const token = (await randomBytes(48)).toString('base64url');
    const expiresAt = new Date(Date.now() + 90 * 24 * 3600000);
    const accessToken = new AccessToken();
    accessToken.id = token;
    accessToken.user = this;
    accessToken.expiresAt = expiresAt;
    accessToken.save();
    return accessToken;
  }
}

import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {User} from './user/user.entity';
import {GameGateway} from './game/game.gateway';
import {JwtModule} from '@nestjs/jwt';
import {Upgrade} from "./upgrade/upgrade.entity";
import {UserUpgrade} from "./UserUpgrade/userUpgrade.entity";
import {RedisModule} from "./redis/redis.module";
import {UpgradeModule} from "./upgrade/upgrade.module";
import {SeedingService} from './seeding/seeding.service';

const entities = [User, Upgrade, UserUpgrade];
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: entities,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Upgrade]),
    UserModule,
    AuthModule,
    JwtModule,
    RedisModule,
    UpgradeModule,
  ],
  providers: [GameGateway,SeedingService],
})
export class AppModule {}
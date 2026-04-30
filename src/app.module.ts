import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsModule } from './animals/animals.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { AdoptionRequestsModule } from './adoption-requests/adoption-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',

        url: `postgres://${cfg.getOrThrow('DB_USER')}:${cfg.getOrThrow('DB_PASSWORD')}@${cfg.getOrThrow('DB_HOST')}:${cfg.getOrThrow('DB_PORT')}/${cfg.getOrThrow('DB_NAME')}?sslmode=require`,

        ssl: {
          rejectUnauthorized: false,
        },

        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    AnimalsModule,
    LocationsModule,
    UsersModule,
    AdoptionRequestsModule,
  ],
})
export class AppModule {}

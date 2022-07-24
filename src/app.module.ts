import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentFile } from './config/configuration ';

const env = getEnvironmentFile();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [env],
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}

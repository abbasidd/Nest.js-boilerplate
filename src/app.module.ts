import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(
      {pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            
          },

        },
      },}
    ),
    ConfigModule.forRoot({
      isGlobal: true, // If set to true, makes the configuration available globally
      envFilePath: ['.env','.env.local','.env.development'], // Specify the path to your .env files
      validationSchema:validationSchema
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

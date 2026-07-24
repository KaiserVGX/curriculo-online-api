import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from './config/datasource';
import { UsuariosService } from './modules/usuarios/usuarios.service';
import { UsuariosController } from './modules/usuarios/usuarios.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => databaseOptions(),
    }),
  ],
  controllers: [AppController, UsuariosController],
  providers: [AppService, UsuariosService]
})
export class AppModule {}
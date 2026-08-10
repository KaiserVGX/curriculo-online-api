import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseOptions } from './config/datasource';

import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CandidatoModule } from './modules/candidato/candidato.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EscolaridadesModule } from './modules/escolaridade/escolaridade.module';
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
    UsuariosModule,
    CandidatoModule,
    AuthModule,
    EscolaridadesModule,
  ],
  controllers: [AppController, UsuariosController],
  providers: [AppService],
})
export class AppModule {}
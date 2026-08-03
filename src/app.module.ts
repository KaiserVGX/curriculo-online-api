import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseOptions } from "./config/datasource";
import { UsuariosModule } from "./modules/usuarios/usuarios.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CandidatoModule } from './modules/candidato/candidato.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
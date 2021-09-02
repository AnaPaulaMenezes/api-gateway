import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';
import { CategoriasModule } from './categorias/categorias.module';
import { Module } from '@nestjs/common';

import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config';
import { AzureModule } from './azure/azure.module';
import { DesafiosModule } from './desafios/desafios.module';
import { RankingsModule } from './rankings/rankings.module';

import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ProxyrmqModule,
    CategoriasModule,
    JogadoresModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AzureModule,
    DesafiosModule,
    RankingsModule,
    PassportModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

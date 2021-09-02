import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';

import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { AzureModule } from 'src/azure/azure.module';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [ProxyrmqModule, AzureModule],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule { }

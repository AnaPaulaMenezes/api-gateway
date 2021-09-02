import { CategoriasController } from './categorias.controller';
import { Module } from '@nestjs/common';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { CategoriasService } from './categorias.service';

@Module({
  imports: [ProxyrmqModule],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule { }

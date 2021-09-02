import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {


  constructor(private readonly categoriaService: CategoriasService) { }

  @Post('')
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    this.categoriaService.criarCategoria(criarCategoriaDto);
  }

  @Get('')
  async consultarCategoriaPeloId(@Query('idCategoria') _id: string): Promise<any> {
    return await this.categoriaService.consultarCategoriaPeloId(_id)
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() categoria: AtualizarCategoriaDto,
    @Param('_id') _id: string,
  ) {
    this.categoriaService.atualizarCategoria(categoria, _id)
  }
}

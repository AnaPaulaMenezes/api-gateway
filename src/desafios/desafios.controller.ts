import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-dasafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';

import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validacao.pipe';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private desafiosService: DesafiosService) { }

  private logger = new Logger(DesafiosController.name);


  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto) {
    this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)
    await this.desafiosService.criarDesafio(criarDesafioDto)
  }

  @Get()
  async consultarDesafios(@Query('idJogador') idJogador: string): Promise<any> {
    return await this.desafiosService.consultarDesafios(idJogador);
  }

  @Put('/:desafio')
  async atualizarDesafio(
    @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
    @Param('desafio') _id: string): Promise<void> {

    await this.desafiosService.atualizarDesafio(atualizarDesafioDto, _id);
  }

  @Post('/:desafio/partida')
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
    @Param('desafio') _id: string): Promise<void> {

    await this.desafiosService.atribuirDesafioPartida(atribuirDesafioPartidaDto, _id);

  }

  @Delete('/:desafio')
  async deletarDesafio(@Param('desafio') _id: string) {

    await this.desafiosService.deletarDesafio(_id);
  }
}

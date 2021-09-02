import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,

} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Observable } from 'rxjs';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { JogadoresService } from './jogadores.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoresService: JogadoresService) { }



  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ) {
    await this.jogadoresService.atualizarJogador(atualizarJogadorDto, _id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async consultarJogadores(@Req() req: Request, @Query('idJogador') _id: string): Promise<any> {

    return await this.jogadoresService.consultarJogadores(_id);
  }

  @Delete('/:_id')
  deletarJogador(@Param('_id', ValidacaoParametrosPipe) _id: string) {
    this.jogadoresService.deletarJogador(_id);
  }

  @Post('/:_id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadArquivo(@UploadedFile() file, @Param('_id') _id: string) {
    return await this.jogadoresService.uploadArquivo(file, _id);

  }
}

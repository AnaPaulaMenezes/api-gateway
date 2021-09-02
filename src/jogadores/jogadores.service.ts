import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { Observable } from 'rxjs';
import { AzureService } from 'src/azure/azure.service';
@Injectable()
export class JogadoresService {
    constructor(private clientProxySmartRanking: ClientProxySmartRanking, private azureService: AzureService) { }

    private logger = new Logger(JogadoresService.name);

    private clientAdminBackend =
        this.clientProxySmartRanking.getClientProxyAdminBackendInstance();


    async criarJogador(criarJogadorDto: CriarJogadorDto) {
        this.logger.log(`CriarjogadorDto: ${criarJogadorDto}`);

        const categoria = await this.clientAdminBackend
            .send('consultar-categorias', criarJogadorDto.categoria)
            .toPromise();

        if (categoria) {
            await this.clientAdminBackend.emit('criar-jogador', criarJogadorDto);
        } else {
            throw new BadRequestException('Categoria não cadastrada');
        }
    }


    async atualizarJogador(
        atualizarJogadorDto: AtualizarJogadorDto,
        _id: string,
    ): Promise<any> {
        const categoria = await this.clientAdminBackend
            .send('consultar-categorias', atualizarJogadorDto.categoria)
            .toPromise();


        const jogador = await this.clientAdminBackend
            .send('consultar-jogadores', _id)
            .toPromise();
        if (!categoria) {
            throw new BadRequestException('Categoria não cadastrada');
        }

        if (!jogador) {
            throw new BadRequestException('Jogador não cadastrado');
        }

        await this.clientAdminBackend.emit('atualizar-jogador', {
            id: _id,
            jogador: atualizarJogadorDto,
        });
    }


    async consultarJogadores(_id: string): Promise<any> {
        return await this.clientAdminBackend.send('consultar-jogadores', _id ? _id : '').toPromise();
    }


    deletarJogador(_id: string) {
        this.clientAdminBackend.emit('deletar-jogador', _id);
    }


    async uploadArquivo(file, _id: string): Promise<any> {
        const jogador = await this.clientAdminBackend.send('consultar-jogadores', _id).toPromise()

        if (!jogador) {
            throw new BadRequestException(`Jogador não encontrado!`)
        }

        const urlFotoJogador = await this.azureService.upload(file);
        const atualizarJogadorDto: AtualizarJogadorDto = { ...jogador, urlFotoJogador };
        await this.clientAdminBackend.emit('atualizar-jogador', { id: _id, jogador: atualizarJogadorDto })


        return this.clientAdminBackend.send('consultar-jogadores', _id).toPromise();

    }
}

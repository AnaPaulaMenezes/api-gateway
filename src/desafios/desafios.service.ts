import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-dasafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafioStatus } from './interfaces/enum-status.enum';
import { Partida } from './interfaces/partida.interface';

import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
@Injectable()
export class DesafiosService {
    constructor(private clientProxySmartRanking: ClientProxySmartRanking) { }

    private logger = new Logger(DesafiosService.name);

    private clientAdminBackend =
        this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

    private clientDesafios =
        this.clientProxySmartRanking.getClientProxyDesafiosInstance();


    async criarDesafio(criarDesafioDto: CriarDesafioDto) {
        this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)

        await Promise.all(criarDesafioDto.jogadores.map(async j => {

            const jogador = await this.clientAdminBackend.send('consultar-jogadores', j._id).toPromise();

            if (!jogador) {
                throw new BadRequestException(`Jogador ${j._id} não cadastrado`);
            }

            if (jogador.categoria !== criarDesafioDto.categoria) {
                throw new BadRequestException(`Jogador ${j._id} não pertence a categoria informada`);
            }

        }));

        const categoria = await this.clientAdminBackend
            .send('consultar-categorias', criarDesafioDto.categoria)
            .toPromise();

        if (!categoria) {
            throw new BadRequestException('Categoria não cadastrada');
        }

        const solicitantePertencePartida = criarDesafioDto.jogadores.filter((j) => (j._id === criarDesafioDto.solicitante));

        if (solicitantePertencePartida.length === 0) {
            throw new BadRequestException('O solicitante deve pertencer a partida');
        }

        await this.clientDesafios.emit('criar-desafio', criarDesafioDto);
    }


    async consultarDesafios(idJogador: string): Promise<any> {

        if (idJogador) {
            const jogador = await this.clientAdminBackend.send('consultar-jogadores', idJogador).toPromise();
            if (!jogador) {
                throw new BadRequestException(`Jogador ${idJogador} não cadastrado`);
            }
        }
        return this.clientDesafios.send('consultar-desafios', { idJogador, _id: '' }).toPromise();
    }


    async atualizarDesafio(
        atualizarDesafioDto: AtualizarDesafioDto,
        _id: string): Promise<void> {

        const desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id }).toPromise();
        if (!desafio) {
            throw new BadRequestException('Desafio não cadastrado')
        }


        if (desafio.status !== DesafioStatus.PENDENTE) {
            throw new BadRequestException('Somente desafios com status pendente podem ser atualizados')
        }

        const desafioAtualizar = {
            _id,
            ...atualizarDesafioDto
        }


        await this.clientDesafios.emit('atualizar-desafio', desafioAtualizar);
    }


    async atribuirDesafioPartida(
        atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
        _id: string): Promise<void> {
        const desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id }).toPromise();

        if (!desafio) {
            throw new BadRequestException('Desafio não cadastrado')
        }



        if (desafio.status === DesafioStatus.ACEITO) {
            if (!desafio.jogadores.includes(atribuirDesafioPartidaDto.def)) {
                throw new BadRequestException('O vencedor informado não pertence a partida');
            }

            const partida: Partida = {}
            partida.categoria = desafio.categoria
            partida.def = atribuirDesafioPartidaDto.def
            partida.desafio = _id
            partida.jogadores = desafio.jogadores
            partida.resultado = atribuirDesafioPartidaDto.resultado

            await this.clientDesafios.emit('criar-partida', partida);
        } else if (desafio.status === DesafioStatus.REALIZADO) {
            throw new BadRequestException('Esse desafio já foi realizado');
        } else {
            throw new BadRequestException('Não é possível atribuir uma partida a um desafio que ainda não foi aceito');
        }
    }


    async deletarDesafio(_id: string) {
        const desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id }).toPromise();
        if (!desafio) {
            throw new BadRequestException('Desafio não cadastrado')
        }
        await this.clientDesafios.emit('deletar-desafio', desafio);
    }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Injectable()
export class RankingsService {

    constructor(
        private readonly clientProxySmartRanking: ClientProxySmartRanking
    ) { }

    private clientRankings = this.clientProxySmartRanking.getClientProxyRankingsInstance()


    async consultaRankings(
        idCategoria: string,
        dataRef: string
    ): Promise<any> {

        if (!idCategoria) {
            throw new BadRequestException('O id da categoria é obrigatório');
        }

        return await this.clientRankings.send('consultar-rankings', { idCategoria: idCategoria, dataRef: dataRef ? dataRef : '' }).toPromise();
    }
}

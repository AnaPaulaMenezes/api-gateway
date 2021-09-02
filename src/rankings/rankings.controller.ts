import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { RankingsService } from './rankings.service';

@Controller('api/v1/rankings')
export class RankingsController {

    constructor(
        private readonly rankingsService: RankingsService,

    ) { }

    @Get()
    async consultaRankings(
        @Query('idCategoria') idCategoria: string,
        @Query('dataRef') dataRef: string
    ) {

        return await this.rankingsService.consultaRankings(idCategoria, dataRef);
    }
}

import { Jogador } from "src/jogadores/interface/jogador.interface";
import { DesafioStatus } from "./enum-status.enum";



export interface Desafio extends Document {

    dataHoraDesafio: Date;
    status: DesafioStatus;
    dataHoraSolicitacao: Date;
    dataHoraResposta: Date;
    solicitante: Jogador;
    categoria: string;
    partida?: string;
    jogadores: Array<Jogador>;
}





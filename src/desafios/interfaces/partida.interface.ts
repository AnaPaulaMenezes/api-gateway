import { Jogador } from "src/jogadores/interface/jogador.interface";

export interface Partida {
    categoria?: string;
    jogadores?: Array<Jogador>;
    desafio?: string
    def?: Jogador;
    resultado?: Array<Resultado>;
}

export interface Resultado {
    set: string;
}


import { Veiculo } from "./Veiculo";

export interface IPesquisavel {
    pesquisarPorCriterio(criterio: string, respositorio: Array<any>): Array<Veiculo>;
}   
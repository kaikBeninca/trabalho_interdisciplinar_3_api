import { Veiculo } from "../models/Veiculo";

export interface IPesquisavel {
    pesquisarPorCriterio(criterio: string, respositorio: Array<any>): Array<Veiculo>;
}
import { IPesquisavel } from "../interfaces/Pesquisavel";
import { RepositorioVeiculo } from "./RepositorioVeiculo";

export abstract class Veiculo implements IPesquisavel {
    private _codigo: string;
    private _marca: string;
    private _modelo: string;
    private _preco: string;
    private _tipoVeiculo: number;
    private _ano: number;
    
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipoVeiculo: number, ano: number) {
        this._codigo = codigo;
        this._marca = marca;
        this._modelo = modelo;
        this._preco = preco;
        this._tipoVeiculo = tipoVeiculo;
        this._ano = ano;
    }

    pesquisarPorCriterio(criterio: string): Array<Veiculo> {
        RepositorioVeiculo.
    }
}
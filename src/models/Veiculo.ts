import { IPesquisavel } from "../interfaces/Pesquisavel";

export abstract class Veiculo implements IPesquisavel {
    private _codigo: string;
    private _marca: string;
    private _modelo: string;
    private _preco: string;
    private _tipo: number;
    private _ano: number;
    
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipo: number, ano: number) {
        this._codigo = codigo;
        this._marca = marca;
        this._modelo = modelo;
        this._preco = preco;
        this._tipo = tipo;
        this._ano = ano;
    }
    
    public get codigo() : string {
        return this._codigo;
    }

    public get marca() : string {
        return this._marca;
    }

    public get modelo() : string {
        return this._modelo;
    }

    public get preco() : string {
        return this._preco;
    }

    public get tipo() : number {
        return this._tipo;
    }

    public get ano() : number {
        return this._ano;
    }    

    public set codigo(novoCodigo) {
        this._codigo = novoCodigo;
    }

    public set marca(novaMarca) {
        this._marca = novaMarca;
    }

    public set modelo(novoModelo) {
        this._modelo = novoModelo;
    }

    public set preco(novoPreco) {
        this._preco = novoPreco;
    }

    abstract calcularIPVA(aliquota: number): number;

    abstract pesquisarPorCriterio(criterio: string, repositorio: Array<any>): Array<Veiculo>;
}
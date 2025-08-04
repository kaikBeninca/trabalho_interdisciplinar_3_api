import { IPesquisavel } from "../interfaces/Pesquisavel";

export abstract class Veiculo implements IPesquisavel {
    private _codigo: string;
    private _marca: string;
    private _modelo: string;
    private _preco: string;
    private _tipo: number | string;
    private _ano: number;
    private _combustivel: string;
    
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipo: number, ano: number, combustivel: string) {
        this._codigo = codigo;
        this._marca = marca;
        this._modelo = modelo;
        this._preco = preco;
        this._ano = ano;

        if (this.modelo.toLowerCase().includes('(elétrico)') || this.modelo.toLowerCase().includes('(elétrica)')) {
            this._combustivel = 'elétrico'
        } else {
            this._combustivel = combustivel.toLowerCase();
        }

        if (tipo == 1) {
            this._tipo = "cars";
        } else {
            this._tipo = "motorcycles";
        }
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

    public get tipo() : number | string {
        return this._tipo;
    }

    public get ano() : number {
        return this._ano;
    }  
    
    public get combustivel() : string {
        return this._combustivel;
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

    public set combustivel(novoCombustivel) {
        this._preco = novoCombustivel;
    }

    abstract calcularIPVA(veiculo: Veiculo, aliquota: number): number;

    abstract pesquisarPorCriterio(criterio: string, vetor: Array<any>): Array<Veiculo>;
}
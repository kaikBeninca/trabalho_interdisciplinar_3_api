import { Versao } from "./Versao";

export class Modelo {
    private _nome: string;
    private _versoes: Versao[];

    constructor(nome: string) {
        this._nome = nome;
        this._versoes = [];
    }

    public get nome() : string {
        return this._nome;
    }
    
    public get versoes() : Versao[] {
        const cloneVersoes = [...this._versoes]
        return cloneVersoes;
    }

    public set nome (novoModelo: string) {
        this._nome = novoModelo;
    }

    public set versoes(novasVersoes: Versao[]) {
        this._versoes = novasVersoes;
    }

    public adicionarVersao(versao: Versao): void {
        this._versoes.push(versao);
    }
}
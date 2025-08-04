import { Modelo } from "./Modelo";

export class Marca {
    private _codigo: string;
    private _nome: string;
    private _modelos: Modelo[];

    constructor(codigo: string, nome: string) {
        this._modelos = [];
        this._codigo = codigo;
        this._nome = nome;
    }

    public get codigo() : string {
        return this._codigo;
    }

    public get nome() : string {
        return this._nome;
    }
    
    public get modelos() : Modelo[] {
        const cloneModelos = [...this._modelos]
        return cloneModelos;
    }

    public set codigo(novoCodigo: string) {
        this._codigo = novoCodigo;
    }
    
    public set nome(novoNome: string) {
        this._nome = novoNome;
    }

    public set modelos(novosModelos: Modelo[]) {
        this._modelos = novosModelos;
    }

    public adiconarModelo(modelo: Modelo): void {
        this._modelos.push(modelo);
    }
}
export class Versao {
    private _codigo: string;
    private _nome: string;

    constructor(codigo: string, nome: string) {
        this._codigo = codigo;
        this._nome = nome;
    }

    public get id() : string {
        return this._codigo;
    }

    public get nome() : string {
        return this._nome;
    }

    public set id(novoId: string) {
        this._codigo = novoId;
    }
    
    public set nome(novaVersao: string) {
        this._nome = novaVersao;
    }
}
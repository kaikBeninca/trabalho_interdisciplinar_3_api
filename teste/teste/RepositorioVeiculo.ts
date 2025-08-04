import { Veiculo } from "./Veiculo";

export class RepositorioVeiculo {
    private _veiculos: Array<Veiculo>;

    constructor() {
        this._veiculos = [];
    }

    get veiculos(): Array<Veiculo> {
        const cloneVeiculos = [... this._veiculos];
        return cloneVeiculos;
    }

    public adicionar(veiculo: Veiculo): void {
        this._veiculos.push(veiculo);
    }

    public listar(): Array<string> {
    const listaVeiculos = this._veiculos.map((veiculo: any): string => {
        return `{
    "codigoFipe": "${veiculo.codigo}";
    "marca": "${veiculo.marca}";
    "modelo": "${veiculo.modelo}";
    "preco": "${veiculo.preco}";
    "tipo: "${veiculo.tipo}";
    "ano": ${veiculo.ano};
    "combustivel: "${veiculo.combustivel}";
}`
    })
    return listaVeiculos;
}

    public pesquisarPorCriterio(tipo: string, marca: string, modelo: string, ano: string): Veiculo[] {
    return this.veiculos.filter((v: any) => {
        return (
            v.tipo.toLowerCase().includes(tipo.toLowerCase()) &&
            v.marca.toLowerCase().includes(marca.toLowerCase()) &&
            v.modelo.toLowerCase().includes(modelo.toLowerCase()) &&
            v.ano.toString().includes(ano)
        );
    });
}
}
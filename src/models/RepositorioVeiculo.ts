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

export const repositorioVeiculo = new RepositorioVeiculo();
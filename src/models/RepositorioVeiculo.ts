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

    adicionar(veiculo: Veiculo): void {
        this._veiculos.push(veiculo);
    }

    pesquisarPorCriterio(criterio: string): Array<Veiculo> {
        return this.veiculos.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.ano.toString().includes(criterio));
    }
}
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

    listarTodos(veiculos: Array<Veiculo>): void{
        veiculos.forEach(e => {
            console.log(`${e.modelo}`);
        })
    }
}
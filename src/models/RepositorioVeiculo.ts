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

    public listar(): void {
    this.veiculos.forEach((veiculo: Veiculo) => {
        console.log(`  Marca: ${veiculo.marca}`);
        console.log(`  Modelo: ${veiculo.modelo}`);
        console.log(`  Ano: ${veiculo.ano}`);
        console.log(`  Tipo: ${veiculo.tipo}`);
        console.log('-----------------------');
    });
}

    public pesquisarPorCriterio(criterio: string): Array<Veiculo> {
        return this._veiculos.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.ano.toString().includes(criterio));
    }
}
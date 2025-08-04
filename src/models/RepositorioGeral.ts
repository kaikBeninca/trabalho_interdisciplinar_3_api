import { Veiculo } from "./Veiculo";
import { Marca } from "./Marca";
import { Modelo } from "./Modelo";

export class RepositorioGeral {
    private static _veiculos: Array<Veiculo> = [];
    private static _marcas: Array<Marca> = [];
    private static _modelos: Array<Modelo> = [];

    constructor() {
    }

    static get veiculos(): Array<Veiculo> {
        const cloneVeiculos = [... RepositorioGeral._veiculos];
        return cloneVeiculos;
    }

    static get marcas(): Array<Marca> {
        const cloneMarcas = [... RepositorioGeral._marcas];
        return cloneMarcas;
    }

    static get modelos(): Array<Modelo> {
        const cloneModelos = [... RepositorioGeral._modelos];
        return cloneModelos;
    }

    public static adicionarVeiculo(veiculo: Veiculo): void {
        this._veiculos.push(veiculo);
    }

    public static adicionarMarca(marca: Marca): void {
        this._marcas.push(marca);
    }

    public static adicionarModelo(modelo: Modelo): void {
        this._modelos.push(modelo);
    }

    // public pesquisarPorCriterio(tipo: string, marca: string, modelo: string, ano: string): Veiculo[] {
    // return this.veiculos.filter((v: any) => {
    //     return (
    //         v.tipo.toLowerCase().includes(tipo.toLowerCase()) &&
    //         v.marca.toLowerCase().includes(marca.toLowerCase()) &&
    //         v.modelo.toLowerCase().includes(modelo.toLowerCase()) &&
    //         v.ano.toString().includes(ano)
    //     );
    // });
    // }
}

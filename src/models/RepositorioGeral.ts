import { Veiculo } from "./Veiculo";
import { Marca } from "./Marca";
import { Modelo } from "./Modelo";

export class RepositorioGeral {
    private static _veiculos: Array<Veiculo> = [];
    private static _marcas: Array<Marca> = [];
    private static _modelos: Array<Modelo> = [];
    private static _favoritos: Array<Veiculo> = [];

    constructor() {
    }

    static get veiculos(): Array<Veiculo> {
        const cloneVeiculos = [...RepositorioGeral._veiculos];
        return cloneVeiculos;
    }

    static get marcas(): Array<Marca> {
        const cloneMarcas = [...RepositorioGeral._marcas];
        return cloneMarcas;
    }

    static get modelos(): Array<Modelo> {
        const cloneModelos = [...RepositorioGeral._modelos];
        return cloneModelos;
    }

    static get favoritos(): Array<Veiculo> {
        const cloneFavoritos = [...RepositorioGeral._favoritos];
        return cloneFavoritos;
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

    public static adicionarFavorito(veiculo: Veiculo): void {
        this._favoritos.push(veiculo);
    }
}

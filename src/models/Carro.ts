import { Veiculo } from "./Veiculo";

export class Carro extends Veiculo {
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipoVeiculo: number, ano: number) {
        super(codigo, marca, modelo, preco, tipoVeiculo, ano)
    }

    calcularIPVA(aliquota: number): number {
        const preco: number = parseFloat(this.preco.replace(/[R$\s.]/g, '').replace(',', '.'));

        return (preco * aliquota) / 100;
    }

    pesquisarPorCriterio(criterio: string, repositorio: Array<any>): Array<Veiculo> {
        const pesquisa: Array<Carro> = repositorio.filter()
    };
}
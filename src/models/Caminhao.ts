import { Veiculo } from "./Veiculo";

export class Caminhao extends Veiculo {
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipoVeiculo: number, ano: number) {
        super(codigo, marca, modelo, preco, tipoVeiculo, ano)
    }

    calcularIPVA(aliquota: number): number {
        const preco: number = parseFloat(this.preco.replace(/[R$\s.]/g, '').replace(',', '.'));

        return (preco * aliquota) / 100;
    }

    pesquisarPorCriterio(criterio: string, repositorio: Array<Veiculo>): Array<Veiculo> {
        return repositorio.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.ano.toString().includes(criterio));
    }
}
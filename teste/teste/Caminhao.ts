import { Veiculo } from "./Veiculo";

export class Caminhao extends Veiculo {
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipoVeiculo: number, ano: number, combustivel: string) {
        super(codigo, marca, modelo, preco, tipoVeiculo, ano, combustivel)
    }

    calcularIPVA(veiculo: Veiculo, aliquota: number): number {
        const preco: number = parseFloat(this.preco.replace(/[R$\s.]/g, '').replace(',', '.'));
        const anoAtual = new Date().getFullYear();

        if (anoAtual - this.ano >= 20) {
            return 0;
        } else if (this.modelo.includes('(E6)')) {
            aliquota = aliquota/2;
        }

        return (preco * aliquota) / 100;
    }

    pesquisarPorCriterio(criterio: string, vetor: Array<Veiculo>): Array<Veiculo> {
        return vetor.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.ano.toString().includes(criterio));
    }
}
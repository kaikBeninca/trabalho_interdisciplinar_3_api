import { Veiculo } from "./Veiculo";

export class Moto extends Veiculo {
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipoVeiculo: number, ano: number, combustivel: string) {
        super(codigo, marca, modelo, preco, tipoVeiculo, ano, combustivel)
    }

    calcularIPVA(aliquota: number): number {
        const preco: number = parseFloat(this.preco.replace(/[R$\s.]/g, '').replace(',', '.'));
        const anoAtual = new Date().getFullYear();

        if (anoAtual - this.ano >= 20 || this.combustivel == 'elétrico') {
            aliquota = 0;
        }

        return (preco * aliquota) / 100;
    }

    pesquisarPorCriterio(criterio: string, repositorio: Array<Veiculo>): Array<Veiculo> {
        return repositorio.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.ano.toString().includes(criterio));
    }
}
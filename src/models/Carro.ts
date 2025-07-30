import { Veiculo } from "./Veiculo";

export class Carro extends Veiculo {
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

    // ✅ Implementação específica para Carro (pode ter lógica diferente)
    pesquisarPorCriterio(criterio: string): Array<Veiculo> {
        // Para Carro, pesquisa em marca e modelo apenas
        // Esta implementação seria usada em contextos específicos
        throw new Error("Este método deve ser usado através do Repositório");
    }
}
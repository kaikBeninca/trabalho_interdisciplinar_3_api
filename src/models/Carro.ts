import { Veiculo } from "./Veiculo";

export class Carro extends Veiculo {
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipoVeiculo: number, ano: number, combustivel: string) {
        super(codigo, marca, modelo, preco, tipoVeiculo, ano, combustivel)
    }

    calcularIPVA(aliquota: { carro: number }): string {
        // Converte o preço para número (tratando formato brasileiro)
        const precoNumerico: number = parseFloat(
            this.preco.replace(/[R$\s.]/g, '').replace(',', '.')
        );

        const anoAtual = new Date().getFullYear();

        // Verifica isenções
        if (anoAtual - this.ano >= 20 || this.combustivel === 'Elétrico') {
            return '0,00'; // Retorna como string formatada
        }

        // Calcula o valor do IPVA
        const valorIPVA = (precoNumerico * aliquota.carro) / 100;

        // Formata o resultado para o padrão brasileiro
        return valorIPVA.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}
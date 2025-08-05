import { Veiculo } from "./Veiculo";

export class Moto extends Veiculo {
    constructor(codigo: string, marca: string, modelo: string, preco: string, tipoVeiculo: number, ano: number, combustivel: string) {
        super(codigo, marca, modelo, preco, tipoVeiculo, ano, combustivel)
    }

    calcularIPVA(aliquota: { moto: string }): string {
        // Converte o preço para número (tratando formato brasileiro)
        const precoNumerico: number = parseFloat(
            this.preco.replace(/[R$\s.]/g, '').replace(',', '.')
        );

        const anoAtual = new Date().getFullYear();

        // Verifica isenções
        if (anoAtual - this.ano >= 20 || this.combustivel === 'elétrico') {
            return '0,00'; // Retorna como string formatada
        }

        // Converte a alíquota de string para número
        const aliquotaNumerica = parseFloat(aliquota.moto.replace('.', '').replace(',', '.'));

        // Calcula o valor do IPVA
        const valorIPVA = (precoNumerico * aliquotaNumerica) / 1000;

        // Formata o resultado para o padrão brasileiro
        return valorIPVA.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    pesquisarPorCriterio(criterio: string, vetor: Array<Veiculo>): Array<Veiculo> {
        return vetor.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(criterio.toLowerCase()));
    }
}
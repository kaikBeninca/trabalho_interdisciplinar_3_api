import { Veiculo } from "./Veiculo";

const API_BASE = 'https://fipe.parallelum.com.br/api/v2';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYzJjNzg2Ni0xZTMzLTRiMTAtYjQzMi1hMDRiOGNiNWFhMDciLCJlbWFpbCI6ImthaWtiZW5pbmNhMDZAZ21haWwuY29tIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiOiJzdWJfMVJxSng2Q1N2SXMwOHRJRUZEdVhZanpKIiwiaWF0IjoxNzUzODIwMjE0fQ.iuzuX-IYNodYHsk-YON0SW2EEBt7v_R05GtkjMdfCIM';

// ============================= API FUNCTIONS =============================

export default async function fipeRequest(endpoint: string): Promise<any> { // Removi o parâmetro token
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-Subscription-Token': TOKEN // Token incluído diretamente aqui
    };

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, { headers });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

export async function buscarVeiculo(tipo: string | number): Promise<any>;
export async function buscarVeiculo(tipo: string | number, marcaNome: string): Promise<any>;
export async function buscarVeiculo(tipo: string | number, marcaNome: string, modeloNome: string): Promise<any>;
export async function buscarVeiculo(tipo: string | number, marcaNome: string, modeloNome: string, anoEscolhido: number): Promise<any>;

export async function buscarVeiculo(tipo: string | number, marcaNome?: string, modeloNome?: string, anoEscolhido?: number | null): Promise<any> {
    try {
        // 1. Buscar marcas
        const marcas = await fipeRequest(`/${tipo}/brands`);
        const marca = marcaNome ? marcas.find((m: any) => m.name.toLowerCase().includes(marcaNome.toLowerCase())) : marcas[0];

        if (!marca) throw new Error(`Marca "${marcaNome}" não encontrada`);

        // 2. Buscar modelos
        const modelos = await fipeRequest(`/${tipo}/brands/${marca.code}/models`);
        const listaModelos = modelos.models || modelos;
        const modelo = modeloNome ? listaModelos.find((m: any) => m.name.toLowerCase().includes(modeloNome.toLowerCase())) : listaModelos[0];

        if (!modelo) throw new Error(`Modelo "${modeloNome}" não encontrado`);

        // 3. Buscar anos
        const anos = await fipeRequest(`/${tipo}/brands/${marca.code}/models/${modelo.code}/years`);
        const anoSelecionado = anoEscolhido ? anos.find((a: any) => a.name.includes(anoEscolhido.toString())) || anos[0] : anos[0];

        if (!anoSelecionado) throw new Error(`Ano "${anoEscolhido}" não encontrado`);

        // 4. Obter detalhes
        const detalhes = await fipeRequest(
            `/${tipo}/brands/${marca.code}/models/${modelo.code}/years/${anoSelecionado.code}`
        );

        return detalhes;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro:", error.message);
            throw error;
        }
    }
}

export async function compararVeiculos(veiculos: Array<Veiculo>) {
    const resultados = [];

    for (const veiculo of veiculos) {
        try {
            const dados = await buscarVeiculo(
                veiculo.tipo,
                veiculo.marca,
                veiculo.modelo,
                veiculo.ano
            );

            resultados.push({
                nome: `${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`,
                preco: dados.price,
                precoNumerico: parseFloat(dados.price.replace(/[R$\s.]/g, '').replace(',', '.'))
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao buscar ${veiculo.marca} ${veiculo.modelo}:`, error.message);
            }
        }
    }

    resultados.sort((a, b) => a.precoNumerico - b.precoNumerico);

    console.log('🏆 COMPARAÇÃO DE PREÇOS:');
    resultados.forEach((resultado, index) => {
        console.log(`${index + 1}º ${resultado.nome}: ${resultado.preco}`);
    });

    return resultados;
}
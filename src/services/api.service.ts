import { Veiculo } from "../models/Veiculo";

const API_BASE = 'https://fipe.parallelum.com.br/api/v2';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYzJjNzg2Ni0xZTMzLTRiMTAtYjQzMi1hMDRiOGNiNWFhMDciLCJlbWFpbCI6ImthaWtiZW5pbmNhMDZAZ21haWwuY29tIiwiaWF0IjoxNzUzMjQzODk3fQ.m9gGtbkey8eZohTJysTiuLRp2A6yMW0Xam39n0JTtd4';

// Função helper para fazer requisições
export default async function fipeRequest(endpoint: string, token = null) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers['X-Subscription-Token'] = token;
    }
    
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

async function buscarVeiculo(tipo: number, marcaNome: string, modeloNome: string, anoEscolhido: number | null = null) {
    try {
        // 1. Buscar marcas
        const marcas = await fipeRequest(`/${tipo}/brands`);
        const marca = marcas.find((m: any) => 
            m.name.toLowerCase().includes(marcaNome.toLowerCase())
        );
        
        if (!marca) {
            throw new Error(`Marca "${marcaNome}" não encontrada`);
        }
        
        // 2. Buscar modelos
        const modelos = await fipeRequest(`/${tipo}/brands/${marca.code}/models`);
        const modelo = modelos.find((m: any) => 
            m.name.toLowerCase().includes(modeloNome.toLowerCase())
        );
        
        if (!modelo) {
            throw new Error(`Modelo "${modeloNome}" não encontrado`);
        }
        
        // 3. Buscar anos
        const anos = await fipeRequest(
            `/${tipo}/brands/${marca.code}/models/${modelo.code}/years`
        );
        
        let anoSelecionado = anos[0]; // Padrão: mais recente
        if (anoEscolhido) {
            anoSelecionado = anos.find((a: any) => a.name.includes(anoEscolhido));
        }
        
        // 4. Obter detalhes
        const detalhes = await fipeRequest(
            `/${tipo}/brands/${marca.code}/models/${modelo.code}/years/${anoSelecionado.code}`
        );
        
        return detalhes;
        
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro:', error.message);
            throw error;
        }
    }
}

async function compararVeiculos(veiculos: Array<Veiculo>) {
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
    
    // Ordenar por preço
    resultados.sort((a, b) => a.precoNumerico - b.precoNumerico);
    
    console.log('🏆 COMPARAÇÃO DE PREÇOS:');
    resultados.forEach((resultado, index) => {
        console.log(`${index + 1}º ${resultado.nome}: ${resultado.preco}`);
    });
    
    return resultados;
}
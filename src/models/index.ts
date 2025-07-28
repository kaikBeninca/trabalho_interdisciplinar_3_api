import { Veiculo } from "../models/Veiculo";

const API_BASE = 'https://fipe.parallelum.com.br/api/v2';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYzJjNzg2Ni0xZTMzLTRiMTAtYjQzMi1hMDRiOGNiNWFhMDciLCJlbWFpbCI6ImthaWtiZW5pbmNhMDZAZ21haWwuY29tIiwiaWF0IjoxNzUzMjQzODk3fQ.m9gGtbkey8eZohTJysTiuLRp2A6yMW0Xam39n0JTtd4';

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

async function buscarPorCodigoFipe(codigoFipe: string, ano?: string | null) {
    try {
        // Se não informar ano, buscar anos disponíveis primeiro
        if (!ano) {
            const anos = await fipeRequest(`/cars/${codigoFipe}/years`);
            ano = anos[0].code; // Pegar o primeiro ano
        }
        
        const veiculo = await fipeRequest(`/cars/${codigoFipe}/years/${ano}`);
        
        console.log('🔍 Busca por código FIPE:');
        console.log(`Código FIPE: ${veiculo.codeFipe}`);
        console.log(`Modelo: ${veiculo.model}`);
        console.log(`Preço: ${veiculo.price}`);
        
        return veiculo;
        
    } catch (error) {
        console.error('Erro na busca por código FIPE:', error);
    }
}
// Buscar Honda Civic 2020 (exemplo)
buscarPorCodigoFipe('004278-1', '2020-1');
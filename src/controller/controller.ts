import { Veiculo } from "../models/Veiculo";
import { Carro } from '../models/Carro';
import { Moto } from '../models/Moto';
import { Caminhao } from '../models/Caminhao';
import { RepositorioVeiculo } from "../models/RepositorioVeiculo";
import * as controller from './controller';

const API_BASE = 'https://fipe.parallelum.com.br/api/v2';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYzJjNzg2Ni0xZTMzLTRiMTAtYjQzMi1hMDRiOGNiNWFhMDciLCJlbWFpbCI6ImthaWtiZW5pbmNhMDZAZ21haWwuY29tIiwiaWF0IjoxNzUzMjQzODk3fQ.m9gGtbkey8eZohTJysTiuLRp2A6yMW0Xam39n0JTtd4';

// ============================= API FUNCTIONS =============================

export default async function fipeRequest(endpoint: string, token?: string | null) {
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

// Sobrecargas
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
        const listaModelos = modelos.models || modelos; // compatível com diferentes formatos
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

    // Ordenar por preço
    resultados.sort((a, b) => a.precoNumerico - b.precoNumerico);

    console.log('🏆 COMPARAÇÃO DE PREÇOS:');
    resultados.forEach((resultado, index) => {
        console.log(`${index + 1}º ${resultado.nome}: ${resultado.preco}`);
    });

    return resultados;
}

// ============================= SYSTEM FUNCTIONS =============================

export const vetVeiculos = new RepositorioVeiculo();

export async function instanciasVeiculos(tipo: string, marca: string, modelo: string, ano: number) {
    try {
        const veiculoFipe = await controller.buscarVeiculo(tipo, marca, modelo, ano);

        if (tipo == 'cars') {
            var classe = Carro;
        } else if (tipo == 'motorcycles') {
            var classe = Moto;
        } else {
            var classe = Caminhao;
        }

        if (!veiculoFipe) {
            throw new Error('Veículo não encontrado');
        }

        const veiculo = new classe(veiculoFipe.codeFipe, veiculoFipe.brand, veiculoFipe.model, veiculoFipe.price, veiculoFipe.vehicleType, veiculoFipe.modelYear, veiculoFipe.fuel);

        vetVeiculos.adicionar(veiculo);

    } catch (error: any) {
        console.error(`❌ Erro ao buscar/adicionar veículo:
- Tipo: ${tipo}
- Marca: ${marca}
- Modelo: ${modelo}
- Ano: ${ano}
- Detalhes: ${error?.message || error}
        `);
    }
}

export const instancias = [
// Instanciação de carros
instanciasVeiculos('cars', 'Volkswagen', 'Santana', 1993),
instanciasVeiculos('cars', 'Ford', 'Versailles', 1992),
instanciasVeiculos('cars', 'Ford', 'Escort', 1993),
instanciasVeiculos('cars', 'Fiat', 'Uno', 1994),
instanciasVeiculos('cars', 'Chevrolet', 'Kadett', 1995),
instanciasVeiculos('cars', 'Volkswagen', 'Logus', 1995),
instanciasVeiculos('cars', 'Volkswagen', 'Golf', 1996),
instanciasVeiculos('cars', 'Fiat', 'Tempra', 1994),
instanciasVeiculos('cars', 'Fiat', 'Tipo', 1997),
instanciasVeiculos('cars', 'Ford', 'Escort', 1996),
instanciasVeiculos('cars', 'Chevrolet', 'Ipanema', 1993),
instanciasVeiculos('cars', 'Ford', 'Verona', 1995),
instanciasVeiculos('cars', 'Volkswagen', 'Parati', 1996),
instanciasVeiculos('cars', 'Fiat', 'Premio', 1991),
instanciasVeiculos('cars', 'Volkswagen', 'Santana', 1994),
instanciasVeiculos('cars', 'Toyota', 'Corolla', 2008),
instanciasVeiculos('cars', 'Honda', 'Civic', 2010),
instanciasVeiculos('cars', 'Chevrolet', 'Corsa', 2005),
instanciasVeiculos('cars', 'Chevrolet', 'Onix', 2014),
instanciasVeiculos('cars', 'Hyundai', 'HB20', 2013),
instanciasVeiculos('cars', 'Volkswagen', 'Fox', 2012),
instanciasVeiculos('cars', 'Fiat', 'Argo', 2022),
instanciasVeiculos('cars', 'Renault', 'Sandero', 2015),
instanciasVeiculos('cars', 'Nissan', 'Versa', 2017),
instanciasVeiculos('cars', 'Kia', 'Rio', 2016),
instanciasVeiculos('cars', 'Peugeot', '208', 2018),
instanciasVeiculos('cars', 'Toyota', 'Prius', 2019),
instanciasVeiculos('cars', 'Nissan', 'Leaf', 2021),
instanciasVeiculos('cars', 'BMW', 'i3', 2019),
instanciasVeiculos('cars', 'Audi', 'e-tron', 2021),
instanciasVeiculos('cars', 'Mercedes', 'EQC', 2020),
instanciasVeiculos('cars', 'Hyundai', 'Kona', 2021),
instanciasVeiculos('cars', 'Volkswagen', 'Up!', 2014),
instanciasVeiculos('cars', 'Fiat', 'Uno', 2012),
instanciasVeiculos('cars', 'Ford', 'Ka', 2016),
instanciasVeiculos('cars', 'Honda', 'Fit', 2018),
instanciasVeiculos('cars', 'Citroën', 'C3', 2019),
instanciasVeiculos('cars', 'BYD', 'Seal', 2024),
instanciasVeiculos('cars', 'Jeep', 'Renegade', 2019),

// Instanciação de motos
instanciasVeiculos('motorcycles', 'Honda', 'CG', 1994),
instanciasVeiculos('motorcycles', 'Yamaha', 'YBR', 2005),
instanciasVeiculos('motorcycles', 'Suzuki', 'Intruder', 2007),
instanciasVeiculos('motorcycles', 'Yamaha', 'Fazer', 2011),
instanciasVeiculos('motorcycles', 'Honda', 'CB', 2012),
instanciasVeiculos('motorcycles', 'Yamaha', 'TRX', 1997),
instanciasVeiculos('motorcycles', 'Ducati', 'Monster', 2016),
instanciasVeiculos('motorcycles', 'KTM', 'Duke', 2017),
instanciasVeiculos('motorcycles', 'BMW', 'G', 2018),
instanciasVeiculos('motorcycles', 'Honda', 'PCX', 2016),
instanciasVeiculos('motorcycles', 'Royal Enfield', 'Meteor', 2019),
instanciasVeiculos('motorcycles', 'Voltz', 'EV1', 2022),
instanciasVeiculos('motorcycles', 'Shineray', 'SHE', 2023),
instanciasVeiculos('motorcycles', 'Super Soco', 'TC Max', 2022),
instanciasVeiculos('motorcycles', 'Honda', 'CB', 1995),
instanciasVeiculos('motorcycles', 'Yamaha', 'FZ6', 2006),
instanciasVeiculos('motorcycles', 'Kawasaki', 'Ninja', 2010),
instanciasVeiculos('motorcycles', 'BMW', 'K', 2013),
instanciasVeiculos('motorcycles', 'Harley-Davidson', 'Sportster', 2014),
instanciasVeiculos('motorcycles', 'Triumph', 'Tiger', 2015),
instanciasVeiculos('motorcycles', 'KTM', 'Duke', 2016),
instanciasVeiculos('motorcycles', 'Honda', 'CBR', 2017),
instanciasVeiculos('motorcycles', 'BMW', 'R', 2018),
instanciasVeiculos('motorcycles', 'Ducati', 'Multistrada', 2019),
instanciasVeiculos('motorcycles', 'Super Soco', 'Change Urban', 2021),
instanciasVeiculos('motorcycles', 'Voltz', 'EVS', 2023),
instanciasVeiculos('motorcycles', 'BMW', 'BAGGER', 2018),
instanciasVeiculos('motorcycles', 'Yamaha', 'MT', 2015),
instanciasVeiculos('motorcycles', 'Kawasaki', 'Versys', 2018),
instanciasVeiculos('motorcycles', 'Suzuki', 'V-Strom', 2016),
instanciasVeiculos('motorcycles', 'Royal Enfield', 'Classic', 2015),
instanciasVeiculos('motorcycles', 'Ducati', 'Scrambler', 2016),
instanciasVeiculos('motorcycles', 'Kawasaki', 'Z900', 2018),
instanciasVeiculos('motorcycles', 'BMW', 'F', 2019),
instanciasVeiculos('motorcycles', 'KTM', 'Adventure', 2020),
instanciasVeiculos('motorcycles', 'Yamaha', 'XMAX', 2021),
instanciasVeiculos('motorcycles', 'Honda', 'X-ADV', 2022),
instanciasVeiculos('motorcycles', 'Voltz', 'EV01', 2019),

// Instanciação de caminhões
instanciasVeiculos('trucks', 'Mercedes-Benz', 'Atego', 2021),
instanciasVeiculos('trucks', 'Volvo', 'VM', 2021),
instanciasVeiculos('trucks', 'Iveco', 'Tector', 2020),
instanciasVeiculos('trucks', 'Ford', 'Cargo', 2018),
instanciasVeiculos('trucks', 'MAN', 'TGX', 2016),
instanciasVeiculos('trucks', 'Agrale', '14000', 2019),
instanciasVeiculos('trucks', 'Hyundai', 'HD', 2020),
instanciasVeiculos('trucks', 'Mercedes-Benz', 'Atego', 2020),
instanciasVeiculos('trucks', 'Iveco', 'Tector', 2018),
instanciasVeiculos('trucks', 'Volkswagen', 'Constellation', 2017),
instanciasVeiculos('trucks', 'Ford', 'Cargo', 2017),
instanciasVeiculos('trucks', 'MAN', 'TGX', 2015),
instanciasVeiculos('trucks', 'Agrale', '14000', 2018),
instanciasVeiculos('trucks', 'Hyundai', 'HD', 2019),
instanciasVeiculos('trucks', 'Mercedes-Benz', 'Axor', 2018),
instanciasVeiculos('trucks', 'Volvo', 'FMX', 2018),
instanciasVeiculos('trucks', 'Iveco', 'Hi-Way', 2019),
instanciasVeiculos('trucks', 'Volkswagen', 'Delivery', 2020),
instanciasVeiculos('trucks', 'Mercedes-Benz', 'Actros', 2023),
instanciasVeiculos('trucks', 'Mercedes-Benz', 'Actros', 2024),
instanciasVeiculos('trucks', 'Volvo', 'FH', 2023),
instanciasVeiculos('trucks', 'Volvo', 'FH', 2024),
instanciasVeiculos('trucks', 'Iveco', 'Hi-Way', 2023),
instanciasVeiculos('trucks', 'Iveco', 'Hi-Way', 2024),
instanciasVeiculos('trucks', 'Volkswagen', 'Meteor', 2023),
instanciasVeiculos('trucks', 'Volkswagen', 'Meteor', 2024),
instanciasVeiculos('trucks', 'Ford', 'F-MAX', 2023),
instanciasVeiculos('trucks', 'Ford', 'F-MAX', 2024),
instanciasVeiculos('trucks', 'EFFA', 'N900', 2012),
instanciasVeiculos('trucks', 'MAN', 'TGX', 2023),
instanciasVeiculos('trucks', 'MAN', 'TGX', 2024),
instanciasVeiculos('trucks', 'Mercedes-Benz', 'Arocs', 2023),
instanciasVeiculos('trucks', 'Volvo', 'FMX', 2024),
instanciasVeiculos('trucks', 'Iveco', 'S-Way', 2024),
instanciasVeiculos('trucks', 'Volkswagen', 'Delivery', 2024),
instanciasVeiculos('trucks', 'Ford', 'Cargo', 2024),
instanciasVeiculos('trucks', 'EFFA', 'JBC', 2011)
];
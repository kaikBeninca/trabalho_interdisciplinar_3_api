import { Veiculo } from "../models/Veiculo";
import { Carro } from '../models/Carro';
import { Moto } from '../models/Moto';
import { RepositorioGeral } from "../models/RepositorioGeral";
import { Marca } from "../models/Marca";
import { Modelo } from "../models/Modelo";
import { Versao } from "../models/Versao";

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

        const resposta = await response.json();
        return resposta;

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

export async function construindoMarcas(): Promise<void> {
    // Definimos os códigos específicos para cada tipo
    const marcasParaBuscar = [
        { tipo: 'cars', codigos: ['31', '41', '43'] },
        { tipo: 'motorcycles', codigos: ['77', '91', '192'] }
    ];

    try {
        // Para cada grupo (carros e motos)
        for (const grupo of marcasParaBuscar) {
            // Busca TODAS as marcas desse tipo
            const todasMarcas = await fipeRequest(`/${grupo.tipo}/brands`);

            // Filtra apenas as marcas com os códigos que precisamos
            const marcasFiltradas = todasMarcas.filter((marca: any) =>
                grupo.codigos.includes(marca.code)
            );

            // Adiciona ao repositório
            marcasFiltradas.forEach((marca: any) => {
                const instanciaMarca = new Marca(marca.code, marca.name);
                if (!RepositorioGeral.marcas.some(m => m.codigo === instanciaMarca.codigo)) {
                    RepositorioGeral.adicionarMarca(instanciaMarca);
                }
            });
        }
    } catch (error) {
        console.error('Erro ao carregar marcas:', error);
        throw new Error('Falha ao carregar marcas da FIPE');
    }
}

export async function construindoModelos(): Promise<void> {
    try {
        for (const marca of RepositorioGeral.marcas) {
            try {
                let modelosCarros = [];
                let modelosMotos = [];

                // Primeiro tenta como carro
                try {
                    modelosCarros = await fipeRequest(`/cars/brands/${marca.codigo}/models`);
                } catch (carError) {
                    console.log(`Marca ${marca.nome} não é de carros (código ${marca.codigo})`);
                }

                //Depois tenta como moto
                try {
                    modelosMotos = await fipeRequest(`/motorcycles/brands/${marca.codigo}/models`);
                } catch (motoError) {
                    console.log(`Marca ${marca.nome} não é de motos (código ${marca.codigo})`);
                }

                // Combina os resultados
                const todosModelos = [...modelosCarros, ...modelosMotos];
                let vetTemporario: Array<Versao> = [];

                todosModelos.forEach((modelo: any) => {
                    // Pega o primeiro nome do modelo (ex: "Fox" em "Fox 1.6 MSI 8v 5p")
                    const modeloGeral = modelo.name.split(' ')[0];

                    // Verifica se já existe algum modelo com esse nome geral
                    const modeloJaExiste = RepositorioGeral.modelos.some(m =>
                        m.nome.split(' ')[0] === modeloGeral
                    );

                    if (!modeloJaExiste) {
                        const instanciaModelo = new Modelo(modeloGeral);
                        RepositorioGeral.adicionarModelo(instanciaModelo);
                        marca.adiconarModelo(instanciaModelo);
                    }

                    // Adiciona a versão específica (independente de ser novo modelo ou não)
                    const versao = new Versao(modelo.code, modelo.name);
                    vetTemporario.push(versao);


                });

                // Associa versões aos modelos
                RepositorioGeral.modelos.forEach((modelo: Modelo) => {
                    vetTemporario.forEach((versao: Versao) => {
                        if (versao.nome.includes(modelo.nome)) {
                            modelo.adicionarVersao(versao);
                        }
                    });
                });


            } catch (error) {
                console.error(`Erro ao processar marca ${marca.nome}:`, error);
            }
        }
    } catch (error) {
        console.error(`Erro geral ao construir modelos:`, error);
    }
}

export async function construindoVeiculos(tipoVeiculo: string, marca: string, modelo: string, ano: string, tipoCombustivel: string) {
    try {
        const veiculo = await fipeRequest(`/${tipoVeiculo}/brands/${marca}/models/${modelo}/years/${ano}-${tipoCombustivel}`);
        let novoVeiculo: Veiculo; // Use o tipo base

        if (tipoVeiculo == 'cars') {
            novoVeiculo = new Carro(veiculo.codeFipe, veiculo.brand, veiculo.model, veiculo.price, veiculo.vehicleType, veiculo.modelYear, veiculo.fuel);
        } else {
            novoVeiculo = new Moto(veiculo.codeFipe, veiculo.brand, veiculo.model, veiculo.price, veiculo.vehicleType, veiculo.modelYear, veiculo.fuel);
        }

        let veiculoVerificado = RepositorioGeral.veiculos.some((e: Veiculo) => e.codigo === novoVeiculo.codigo);

        if (!veiculoVerificado) {
            RepositorioGeral.adicionarVeiculo(novoVeiculo);
        }

        return novoVeiculo;

    } catch (error: any) {
        console.error(`❌ Erro ao buscar/adicionar veículo:
    - Tipo: ${tipoVeiculo}
    - Marca: ${marca}
    - Modelo: ${modelo}
    - Ano: ${ano}
    - Detalhes: ${error?.message || error}
            `);
    }
}

export function filtrarModelosPorMarcas(marca: string): Marca[] {
    const termoBusca = marca.toLowerCase();

    return RepositorioGeral.marcas.filter((objMarca: Marca) =>
        objMarca.nome.toLowerCase().includes(termoBusca)

    );
}
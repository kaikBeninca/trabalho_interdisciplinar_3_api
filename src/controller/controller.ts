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

export async function construindoMarcas(): Promise<void> {
    // Defino os códigos específicos para cada tipo
    const marcasParaBuscar = [
        {
            tipo: 'cars',
            codigos: ['31', '41', '43']
        },
        {
            tipo: 'motorcycles',
            codigos: ['77', '91', '192']
        }
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

                    // Se não existir, instancia Modelo e adiciona tanto no repositório geral quanto no vetor de modelo dentro de Marca
                    if (!modeloJaExiste) {
                        const instanciaModelo = new Modelo(modeloGeral);
                        RepositorioGeral.adicionarModelo(instanciaModelo);
                        marca.adiconarModelo(instanciaModelo);
                    }

                    // Adiciona a versão específica
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

        // Verifica o tipo retornado para instanciar ou Carro ou Moto
        if (tipoVeiculo == 'cars') {
            novoVeiculo = new Carro(veiculo.codeFipe, veiculo.brand, veiculo.model, veiculo.price, veiculo.vehicleType, veiculo.modelYear, veiculo.fuel);
        } else {
            novoVeiculo = new Moto(veiculo.codeFipe, veiculo.brand, veiculo.model, veiculo.price, veiculo.vehicleType, veiculo.modelYear, veiculo.fuel);
        }

        // Verifica se já existe um Veiculo com código do novoVeiculo para não ter duplicação
        const veiculoVerificado = RepositorioGeral.veiculos.some((e: Veiculo) => e.codigo === novoVeiculo.codigo);

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
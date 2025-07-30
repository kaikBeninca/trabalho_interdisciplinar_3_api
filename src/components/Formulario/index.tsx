import { useState } from "react";
import estilos from "./Formulario.module.css";
import ListagemItens from "../ListagemItens";
// ✅ NOVO: Importar os models TypeScript
import { RepositorioVeiculo } from "../../models/RepositorioVeiculo";
import { Carro } from "../../models/Carro";
import { Moto } from "../../models/Moto";
import { Caminhao } from "../../models/Caminhao";
import { Veiculo } from "../../models/Veiculo";
import { buscarVeiculo } from '../../controller/controller';

type Item = {
    marca: string;
    modelo: string;
    ano: string;
    tipo: string;
}

export default function Formulario(props: any) {
    // ✅ NOVO: Usar useState para gerenciar o repositório
    const [repositorio] = useState(() => new RepositorioVeiculo());
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    
    // Estados do formulário (mantidos como estavam)
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [tipo, setTipoVeiculo] = useState('default');
    const [items, setItems] = useState<Array<Item>>([]);
    
    // ✅ NOVO: Estados para feedback
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    
    // ✅ NOVO: Estados para pesquisa
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [resultadosPesquisa, setResultadosPesquisa] = useState<Veiculo[]>([]);

    const addItem = (item: Item) => {
        setItems([...items, item])
    }

    // ✅ NOVO: Função para criar veículo usando os models
    const criarVeiculoDoTipo = (tipo: string, dadosAPI: any): Veiculo => {
        switch (tipo) {
            case 'cars':
                return new Carro(
                    dadosAPI.codeFipe || 'N/A',
                    dadosAPI.brand || marca,
                    dadosAPI.model || modelo,
                    dadosAPI.price || 'R$ 0,00',
                    1,
                    dadosAPI.modelYear || parseInt(ano),
                    dadosAPI.fuel || 'Não informado'
                );
            case 'motorcycles':
                return new Moto(
                    dadosAPI.codeFipe || 'N/A',
                    dadosAPI.brand || marca,
                    dadosAPI.model || modelo,
                    dadosAPI.price || 'R$ 0,00',
                    2,
                    dadosAPI.modelYear || parseInt(ano),
                    dadosAPI.fuel || 'Não informado'
                );
            case 'trucks':
                return new Caminhao(
                    dadosAPI.codeFipe || 'N/A',
                    dadosAPI.brand || marca,
                    dadosAPI.model || modelo,
                    dadosAPI.price || 'R$ 0,00',
                    3,
                    dadosAPI.modelYear || parseInt(ano),
                    dadosAPI.fuel || 'Não informado'
                );
            default:
                throw new Error('Tipo de veículo inválido');
        }
    };

    // ✅ MELHORADO: handleSubmit agora usa os models
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        if (tipo === 'default') {
            setErro('Selecione um tipo de veículo');
            return;
        }

        setCarregando(true);
        setErro(null);

        try {
            // 1. Buscar dados na API
            const dadosAPI = await buscarVeiculo(tipo, marca, modelo, parseInt(ano));
            
            // 2. Criar instância do veículo usando o model
            const novoVeiculo = criarVeiculoDoTipo(tipo, dadosAPI);
            
            // 3. Adicionar ao repositório usando método do model
            repositorio.adicionar(novoVeiculo);
            
            // 4. Atualizar estado do React
            setVeiculos(repositorio.veiculos);
            
            // 5. Adicionar ao items também (para manter compatibilidade)
            const newItem = { marca: novoVeiculo.marca, modelo: novoVeiculo.modelo, ano: novoVeiculo.ano.toString(), tipo };
            addItem(newItem);
            
            // 6. Limpar formulário
            setMarca('');
            setModelo('');
            setAno('');
            setTipoVeiculo('default');
            
        } catch (error) {
            setErro(error instanceof Error ? error.message : 'Erro ao buscar veículo');
        } finally {
            setCarregando(false);
        }
    }

    // ✅ NOVO: Função para pesquisar usando método do repositório
    const pesquisarVeiculos = (termo: string) => {
        setTermoPesquisa(termo);
        if (termo.trim()) {
            // Usar método do repositório para pesquisar
            const resultados = repositorio.pesquisarPorCriterio(termo);
            setResultadosPesquisa(resultados);
        } else {
            setResultadosPesquisa([]);
        }
    };
    return (
        <div className={estilos.contForm}>
            <form onSubmit={handleSubmit}>
                <div className={estilos.campo}>
                    <label>Tipo do Veículo</label>
                    <select 
                        className={estilos.select} 
                        name="tipoVeiculo" 
                        id="sltTipoVeiculo"
                        value={tipo}
                        onChange={(e: any) => setTipoVeiculo(e.target.value)}
                    >
                        <option value="default" disabled>Selecione o tipo do veículo</option>
                        <option value="cars">Carros e Caminhonetes</option>
                        <option value="motorcycles">Motos</option>
                        <option value="trucks">Caminhões</option>
                    </select>
                </div>
                <div className={estilos.campo}>
                    <label>Marca</label>
                    <input
                        type="text"
                        placeholder="Marca"
                        value={marca}
                        onChange={(e: any) => {setMarca(e.target.value)}}
                    />
                </div>
                <div className={estilos.campo}>
                    <label>Modelo</label>
                    <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                </div>
                <div className={estilos.campo}>
                    <label>Ano</label>
                    <input type="text" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} />
                </div>
                <button type="submit" disabled={carregando || tipo === 'default'}>
                    {carregando ? 'Buscando...' : 'Pesquisar'}
                </button>
                
                {/* ✅ NOVO: Mostrar mensagens de erro */}
                {erro && (
                    <div style={{ 
                        color: 'red', 
                        background: '#ffe6e6', 
                        padding: '10px', 
                        borderRadius: '5px',
                        margin: '10px 0' 
                    }}>
                        ❌ {erro}
                    </div>
                )}
                
                {/* ✅ NOVO: Campo de pesquisa */}
                {veiculos.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <input 
                            type="text"
                            placeholder="🔍 Pesquisar veículos por marca, modelo ou ano..."
                            value={termoPesquisa}
                            onChange={(e) => pesquisarVeiculos(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                border: '2px solid #ddd',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                )}

                {/* ✅ NOVO: Mostrar veículos do repositório */}
                {veiculos.length > 0 && (
                    <div>
                        <h3>
                            {termoPesquisa ? 
                                `Resultados da pesquisa (${resultadosPesquisa.length})` : 
                                `Veículos no Repositório (${veiculos.length})`
                            }
                        </h3>
                        {(termoPesquisa ? resultadosPesquisa : veiculos).map((veiculo, index) => (
                            <div key={index} style={{ 
                                border: '1px solid #ccc', 
                                padding: '10px', 
                                margin: '5px 0',
                                borderRadius: '5px',
                                background: termoPesquisa ? '#f0f8ff' : 'white'
                            }}>
                                <strong>{veiculo.marca} {veiculo.modelo}</strong> ({veiculo.ano})<br />
                                Preço: {veiculo.preco}<br />
                                Combustível: {veiculo.combustivel}<br />
                                {/* ✅ USANDO MÉTODO DO MODEL: */}
                                <strong>IPVA (4%): R$ {veiculo.calcularIPVA(4).toFixed(2)}</strong>
                            </div>
                        ))}
                        
                        {termoPesquisa && resultadosPesquisa.length === 0 && (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>
                                Nenhum veículo encontrado para "{termoPesquisa}"
                            </p>
                        )}
                    </div>
                )}
                
                <ListagemItens items={items} />
            </form>
        </div>
    );
}
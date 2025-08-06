import { useEffect, useState } from "react";
import estilos from "./Formulario.module.css";
import { construindoMarcas, construindoModelos, construindoVeiculos } from "../../controller/controller";
import { RepositorioGeral } from "../../models/RepositorioGeral";
import { Marca } from "../../models/Marca";
import { Modelo } from "../../models/Modelo";
import { Versao } from "../../models/Versao";
import SelectModelos from "../SelectModelos";
import SelectVersoes from "../SelectVersoes";
import Item from "../Item";
import { Veiculo } from "../../models/Veiculo";
import estadosAliquota from '../../dados/IPVA.json';

type VeiculoTipo = 'default' | 'cars' | 'motorcycles';

export default function Formulario() {
  // Estados do formulário
  const [tipo, setTipoVeiculo] = useState<VeiculoTipo>('default');
  const [marca, setMarca] = useState<string>('');
  const [marcasFiltradas, setMarcasFiltradas] = useState<Marca[]>([]);
  const [modelo, setModelo] = useState<string>('');
  const [modelosFiltrados, setModelosFiltrados] = useState<Modelo[]>([]);
  const [versao, setVersao] = useState<string>('');
  const [versoesFiltradas, setVersoesFiltradas] = useState<Versao[]>([]);
  const [ano, setAno] = useState<string>('');
  const [combustivel, setCombustivel] = useState<string>('default');
  const [carregando, setCarregando] = useState<boolean>(false);
  const [veiculo, setVeiculo] = useState<Veiculo | undefined>(undefined);
  const [estado, setEstado] = useState<string>('default');

  // Carrega dados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        await construindoMarcas();
        await construindoModelos();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  // Filtra marcas quando o tipo muda
  useEffect(() => {
    if (tipo === 'default') {
      setMarcasFiltradas([]);
      return;
    }

    const marcasDoTipo = RepositorioGeral.marcas.filter(marca =>
      tipo === 'cars'
        ? ['31', '41', '43'].includes(marca.codigo)
        : ['77', '91', '192'].includes(marca.codigo)
    );

    setMarcasFiltradas(marcasDoTipo);
    setMarca('');
  }, [tipo]);

  useEffect(() => {
    if (!marca) {
      setModelosFiltrados([]);
      setModelo('');
      return;
    }

    const marcaSelecionada = marcasFiltradas.find(m => m.nome === marca);
    if (marcaSelecionada) {
      setModelosFiltrados(marcaSelecionada.modelos);
    }
  }, [marca, marcasFiltradas]);

  // Filtra versões quando o modelo muda
  useEffect(() => {
    if (!modelo) {
      setVersoesFiltradas([]);
      setVersao('');
      return;
    }

    const modeloSelecionado = modelosFiltrados.find(m => m.nome === modelo);
    if (modeloSelecionado) {
      setVersoesFiltradas(modeloSelecionado.versoes);
    }
  }, [modelo, modelosFiltrados]);

  async function handleSubmit(e: React.FormEvent) {   
    e.preventDefault();
    setCarregando(true);

    try {
      const versaoSelecionada = versoesFiltradas.find(v => v.nome === versao);
      var veiculo: Veiculo | undefined;
      if (versaoSelecionada) {
        veiculo = await construindoVeiculos(
          tipo,
          marcasFiltradas.find(m => m.nome === marca)?.codigo || '',
          versaoSelecionada.codigo.toString(),
          ano,
          combustivel          
        );
        setVeiculo(veiculo);
      }
    } catch (error) {
      console.error("Erro ao pesquisar veículo:", error);
    } finally {
      setCarregando(false);
      
    }
  };

  return (
    <div className={estilos.contForm}>
      <form onSubmit={handleSubmit}>
        <div className={estilos.campo}>
          <label>Tipo do Veículo</label>
          <select
            className={estilos.select}
            value={tipo}
            onChange={(e) => setTipoVeiculo(e.target.value as VeiculoTipo)}
            disabled={carregando}
          >
            <option value="default" disabled>Selecione o tipo</option>
            <option value="cars">Carros</option>
            <option value="motorcycles">Motos</option>
          </select>
        </div>
        <div className={estilos.campo}>
          <label>Marca</label>
          <select
            className={estilos.select}
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            disabled={!tipo || carregando}
          >
            <option value="" disabled>Selecione a marca</option>
            {marcasFiltradas.map((marca) => (
              <option key={marca.codigo} value={marca.nome}>
                {marca.nome}
              </option>
            ))}
          </select>
        </div>
        <div className={estilos.campo}>
          <label>Modelo</label>
          <select
            className={estilos.select}
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            disabled={!marca || carregando}
          >
            <option value="" disabled>Selecione o modelo</option>
            <SelectModelos modelos={modelosFiltrados} />
          </select>
        </div>
        <div className={estilos.campo}>
          <label>Versão</label>
          <select
            className={estilos.select}
            value={versao}
            onChange={(e) => setVersao(e.target.value)}
            disabled={!modelo || carregando}
          >
            <option value="" disabled>Selecione a versão</option>
            <SelectVersoes versoes={versoesFiltradas} />
          </select>
        </div>
        <div className={estilos.campo}>
          <label>Ano</label>
          <input
            type="text"
            placeholder="Ano"
            value={ano}
            className={estilos.inputForm}
            onChange={(e) => setAno(e.target.value)}
            disabled={!versao || carregando}
          />
        </div>
        <div className={estilos.campo}>
          <label>Combustível</label>
          <select
            className={estilos.select}
            value={combustivel}
            onChange={(e) => setCombustivel(e.target.value)}
            disabled={!ano || carregando}
          >
            <option value="default" disabled>Selecione</option>
            <option value="1">Gasolina</option>
            <option value="2">Álcool</option>
            <option value="3">Diesel</option>
            <option value="4">Elétrico</option>
            <option value="5">Flex</option>
          </select>
        </div>
        <div className={estilos.campo}>
          <label>Seu Estado</label>
          <select
            className={estilos.select}
            id={estado}
            value={estado}
            onChange={(e) => {
              const novoEstado = e.target.value;
              setEstado(novoEstado);
              localStorage.setItem('estadoSelecionado', novoEstado);
            }}
            disabled={!ano || carregando}
          >
            <option value="default" disabled>Selecione</option>
            {Object.keys(estadosAliquota).map((estado: string) => (
              <option key={estado} value={estado} id={estado}>{estado}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={!combustivel || carregando} className={carregando ? estilos.carregando : ''}>
          {carregando ? 'Pesquisando...' : 'Pesquisar'}
        </button>
      </form>
      <div className={estilos.veiculoRenderizado}>
        {veiculo && (
          <div>
            <Item codigo={veiculo.codigo} marca={veiculo.marca} modelo={veiculo.modelo} preco={veiculo.preco} tipo={veiculo.tipo} ano={veiculo.ano} combustivel={veiculo.combustivel}
              IPVA={
                estado !== "default" ? veiculo.calcularIPVA({
                  carro: estadosAliquota[estado as keyof typeof estadosAliquota].carro,
                  moto: estadosAliquota[estado as keyof typeof estadosAliquota].moto
                }) : 0
              } />
            <button type="button" disabled={!combustivel || carregando} className={carregando ? estilos.carregando : ''} onClick={() => RepositorioGeral.adicionarFavorito(veiculo)}>{carregando ? 'Adicionando...' : 'Adicionar aos Favoritos'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
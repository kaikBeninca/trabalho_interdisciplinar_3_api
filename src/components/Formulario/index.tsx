import { useEffect, useState } from "react";
import estilos from "./Formulario.module.css";
import { construindoMarcas, construindoModelos, construindoVeiculos } from "../../controller/controller";
import { RepositorioGeral } from "../../models/RepositorioGeral";

type Item = {
    marca: string;
    modelo: string;
    ano: string;
    tipo: string;
    combustivel: string;
}

export default function Formulario() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [tipo, setTipoVeiculo] = useState('default');
    const [combustivel, setCombustivel] = useState('default');
    const [items, setItems] = useState<Array<Item>>([]);

    useEffect(() => {
        construindoMarcas();
        construindoModelos();
    }, []);

    const addItem = (item: Item) => {
        setItems([...items, item])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

    const tipoCombustivel = parseInt(combustivel);
    const anoConvertido = parseInt(ano);

    // Adiciona no array de items do React (se quiser exibir depois)
    const newItem = { marca, modelo, ano, tipo, combustivel };
    addItem(newItem);

    // Chama a função TypeScript que constrói o objeto e adiciona no repositório
    await construindoVeiculos(tipo, marca, modelo, anoConvertido, tipoCombustivel);
    console.log(`Veículo adicionado: Marca ${marca} Modelo ${modelo}, Ano: ${ano}, Tipo: ${tipo}, Combustível: ${combustivel}`);
    
    }

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
                <div className={estilos.campo}>
                    <label>Combustível</label>
                    <select 
                        className={estilos.select} 
                        name="combustivel" 
                        id="sltCombustivel"
                        value={combustivel}
                        onChange={(e: any) => setCombustivel(e.target.value)}
                    >
                        <option value="default" disabled>Selecione o tipo do combustível</option>
                        <option value="1">Gasolina</option>
                        <option value="2">Álcool</option>
                        <option value="3">Diesel</option>
                    </select>
                </div>
                <button type="submit">Pesquisar</button>
            </form>
        </div>
    );
}
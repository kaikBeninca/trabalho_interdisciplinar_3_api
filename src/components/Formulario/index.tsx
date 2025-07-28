import { useState } from "react";
import estilos from "./Formulario.module.css";

type Item = {
    marca: string;
    modelo: string;
    ano: string;
    tipo: string;
}

export default function Formulario() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [tipo, setTipoVeiculo] = useState('');
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (newItem: Item) => {
        setItems([...items, newItem])
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addItem({ marca, modelo, ano, tipo })
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
                        <option value="" selected disabled>Selecione o tipo do veículo</option>
                        <option value="1">Carros e Caminhonetes</option>
                        <option value="2">Motos</option>
                        <option value="3">Caminhões</option>
                    </select>
                </div>
                <div className={estilos.campo}>
                    <label>Marca</label>
                    <input type="text" placeholder="Marca" value={marca}
                        onChange={(e) => setMarca(e.target.value)} />
                </div>
                <div className={estilos.campo}>
                    <label>Modelo</label>
                    <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                </div>
                <div className={estilos.campo}>
                    <label>Ano</label>
                    <input type="text" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} />
                </div>
                <button type="submit">Pesquisar</button>
            </form>
        </div>
    );
}
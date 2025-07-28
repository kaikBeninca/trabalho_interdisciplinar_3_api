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
    const [items, setItems] = useState<Array<Item>>([]);

    const addItem = (item: Item) => {
        setItems([...items, item])
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newItem = { marca, modelo, ano, tipo };

        addItem(newItem);
    }
    return (
        <div className={estilos.contForm}>
            <form onSubmit={handleSubmit}>
                <div className={estilos.campo}>
                    <label>Tipo do Veículo</label>
                    
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
                <button type="submit">Pesquisar</button>
            </form>
        </div>
    );
}
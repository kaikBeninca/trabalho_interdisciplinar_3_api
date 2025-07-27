import { useState } from "react";
import estilos from "./Formulario.module.css";

type Item = {
    marca: string;
    modelo: string;
    ano: string;
}

export default function Formulario() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [items, setItems] = useState<Item[]>([])

    const addItem = (newItem: any) => {
        setItems([...items, newItem])
        console.log(items)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addItem({ marca, modelo, ano })
    }
    return (
        <div className={estilos.contForm}>
            <form onSubmit={handleSubmit}>
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
import { useState } from "react";
import estilos from "./SimuladorFinanciamento.module.css";

type Item = {
    marca: string;
    modelo: string;
    ano: string;
}

export default function SimuladorFinanciamento() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [items, setItems] = useState<Array<Item>>([]);

    const addItem = (item: Item) => {
        setItems([...items, item])
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newItem = { marca, modelo, ano };

        addItem(newItem);
    }
    return (
        <div className={estilos.contForm}>
            <form onSubmit={handleSubmit}>
                <div className={estilos.campo}>
                    <label>Valor do veículo</label>
                    <input
                        type="text" placeholder="Valor do veículo" value={marca} onChange={(e: any) => {setMarca(e.target.value)}} />
                </div>
                <div className={estilos.campo}>
                    <label>Valor de entrada</label>
                    <input
                        type="text" placeholder="Entrada" value={marca} onChange={(e: any) => {setMarca(e.target.value)}} />
                </div>
                <div className={estilos.campo}>
                    <label>Parcelas</label>
                    <input type="text" placeholder="Parcelas" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                </div>
                <div className={estilos.campo}>
                    <label>Juros</label>
                    <input type="text" placeholder="Juros" value={ano} onChange={(e) => setAno(e.target.value)} />
                </div>
                <button type="submit">Pesquisar</button>
            </form>
        </div>
    );
}
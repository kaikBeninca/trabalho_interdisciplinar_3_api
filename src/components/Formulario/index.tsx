import { useState } from "react";
import estilos from "./Formulario.module.css";
import ListagemItens from "../ListagemItens";
import { instancias, vetVeiculos } from '../../controller/controller';

Promise.all(instancias).then(() => {
  vetVeiculos.listar();
});

type Item = {
    marca: string;
    modelo: string;
    ano: string;
    tipo: string;
}

export default function Formulario(props: any) {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [tipo, setTipoVeiculo] = useState('default');
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
                <button type="submit">Pesquisar</button>
                <ListagemItens items={items} />
            </form>
        </div>
    );
}
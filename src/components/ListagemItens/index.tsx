import Item from '../Item';
import estilos from './ListagemItens.module.css';

interface ListagemItensProps {
    vetor: any[];
    estado: string;
    estadosAliquota: Record<string, { carro: number; moto: number }>;
}

function ListagemItens({ vetor, estado, estadosAliquota }: ListagemItensProps) {
    return (
        <div className={estilos.carrosel}>
            {vetor.map((elemento: any) => (
                <Item
                    key={elemento.codigo}
                    codigo={elemento.codigo}
                    marca={elemento.marca}
                    modelo={elemento.modelo}
                    preco={elemento.preco}
                    tipo={elemento.tipo}
                    ano={elemento.ano}
                    combustivel={elemento.combustivel}
                    IPVA={
                        estado !== "default" && estadosAliquota[estado]
                            ? elemento.tipo === 'cars'
                                ? elemento.calcularIPVA({ carro: estadosAliquota[estado].carro })
                                : elemento.calcularIPVA({ moto: estadosAliquota[estado].moto })
                            : '0,00'
                    }
                />
            ))}
        </div>
    );
}

export default ListagemItens;
import Item from '../Item';
import estilos from './ListagemItens.module.css';

function ListagemItens(props: any) {
    return (
        <>
            <h1>Resultado da Busca:</h1>
            <div className={estilos.carrousel}>
                <ul>
                    {props.items.map((elemento: any) => (
                        <Item
                            codigo={elemento.codigo}
                            marca={elemento.marca}
                            modelo={elemento.modelo}
                            preco={elemento.preco}
                            tipo={elemento.tipo}
                            ano={elemento.ano}
                            combustivel={elemento.combustivel}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ListagemItens;
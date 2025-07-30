import estilos from './Item.module.css';

export default function Item(props: any) {
    return (
        <ul className={estilos.lista}>
            <li className={estilos.itens}>{props.codigo}</li>
            <li className={estilos.itens}>{props.marca}</li>
            <li className={estilos.itens}>{props.modelo}</li>
            <li className={estilos.itens}>{props.preco}</li>
            <li className={estilos.itens}>{props.tipo}</li>
            <li className={estilos.itens}>{props.ano}</li>
            <li className={estilos.itens}>{props.combustivel}</li>
        </ul>
    )
}

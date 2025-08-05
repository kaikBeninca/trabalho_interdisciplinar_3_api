import estilos from './Item.module.css';

export default function Item(props: any) {
    return (
        <div className={estilos.lista}>
            <div><strong>Código Fipe: </strong> <span className={estilos.valor}>{props.codigo}</span></div>
            <div><strong>Marca: </strong> <span className={estilos.valor}>{props.marca}</span></div>
            <div><strong>Modelo: </strong> <span className={estilos.valor}>{props.modelo}</span></div>
            <div><strong>Preço: </strong> <span className={estilos.valor}>{props.preco}</span></div>
            <div><strong>Tipo: </strong> <span className={estilos.valor}>{props.tipo}</span></div>
            <div><strong>Ano: </strong> <span className={estilos.valor}>{props.ano}</span></div>
            <div><strong>Combustível: </strong> <span className={estilos.valor}>{props.combustivel}</span></div>
            <div><strong>IPVA: </strong> <span className={estilos.valor}>R$ {props.IPVA}</span></div>
        </div>
    )
}
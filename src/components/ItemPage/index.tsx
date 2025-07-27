import { useParams } from 'react-router-dom';
import estilo from './ItemPage.module.css';
import cards from '../../dados/cards.json';

function ItemPage(props: any) {

const parametros = useParams();
console.log(parametros)
  
const card: any = cards.find((e) => e.id === Number(parametros.id))    

return (
    <div className={estilo["item-card"]}>
    <div className={estilo["item-card-header"]}>
        <h2 className={estilo["item-card-title"]}>{card.alt}</h2>
        <p className={estilo["item-card-subtitle"]}>Criado por {card.author}</p>
    </div>
    <div className={estilo["item-card-body"]}>
        <div>
            <img src={card.image} alt={card.alt} />            
        </div>

        <div className={estilo["item-card-footer"]}>
            <p className={estilo["item-card-description"]}>Uma representação estilizada do {card.alt}, desenvolvido por {card.author}.</p>
            <button className={estilo["btn-view"]}>Ver mais</button>
        </div>
    </div>

    
    </div>
)
}

export default ItemPage
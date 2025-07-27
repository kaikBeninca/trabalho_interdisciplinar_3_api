import estilo from './Galeria.module.css';
import Card from '../Card/index';
import cards from '../../dados/cards.json';


export default function Galeria() {

    return(
        <div className={estilo.gallery}>
            {
                cards.map(
                    (e: any) => { 
                     return <Card link={e.image} autor={e.author}/>
                })
            }            
        </div>
    )
}
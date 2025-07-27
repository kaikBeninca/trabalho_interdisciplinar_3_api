import estilo from './Card.module.css';

export default function Card(props: any) {
    return (
        <div className={estilo.container}>
            <div className = {estilo.shotcard}>
                <img src={props.link} alt={props.alt} className={estilo.shotcardimg} />
                <p>{props.autor}</p>
            </div>
        </div>
    )
}
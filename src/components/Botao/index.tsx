import { Link, useNavigate } from 'react-router-dom';
import estilo from './Botao.module.css';

function Botao (props: any) {
    const navegar = useNavigate();

    return (
        <div onClick={() => navegar(props.goto)} className={props.login ? estilo.signup : estilo.default}>{props.descricao}</div>
    )
}

export default Botao;
import Botao from '../Botao';
import estilo from './Header-navlinks.module.css';
import menu from '../../dados/menu.json';
import { useLocation } from 'react-router-dom';

export default function Navlinks() {
    const localizacao = useLocation();

    return (
        <div className={estilo.navlinks}>
            {menu.map((e, i) => {
                return (<Botao key={i} goto={e.goto} descricao={e.descricao} login={localizacao.pathname === e.goto ? true : (false || e.login)} />)
            })}
        </div>
    )
}
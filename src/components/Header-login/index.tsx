import estilo from "./Header-login.module.css";
import login from '../../dados/login.json';
import Botao from "../Botao";

export default function Headerlogin(){
    let links = login;
    return (
        <div className={estilo.authbuttons}>
            {links.map(e => {
                return (
                    <Botao goto={e.goto} descricao={e.descricao} login={e.login}/>
                )
            })}
        </div>
    )
}
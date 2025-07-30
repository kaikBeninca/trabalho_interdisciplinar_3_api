import estilo from "./Header-login.module.css";
import { Icon } from "@iconify/react";
import Botao from "../Botao";


export default function Headerlogin(){
    return (
        <div className={estilo.authbuttons}>
            <Botao goto={"/favoritos"} descricao={<Icon icon="bxs:heart" width="24" height="24" style={{color: "#168328"}} />}/>
        </div>
    )
}
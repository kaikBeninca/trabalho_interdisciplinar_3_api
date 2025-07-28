import estilo from './Header.module.css';
import Navlinks from '../Header-navlinks/index';
import Headerlogin from '../Header-login/index';

export default function Header(props: any) {
    return (
        <header className={estilo.navbar}>
            
            <div className={estilo.container}>
                <div className={estilo.navbarleft}>
                    <img className={estilo.logo} src="/images/logo.png" alt="Logo PrecifyCar" />
                </div>
                <Navlinks/>
                <Headerlogin/>
            </div>
        </header>
    )
}  
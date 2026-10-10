
import './rodape.css'

const Rodape = () => {
    return (<footer className="footer">
       <section>
       <ul>
            <li>
                <a href="https://web.facebook.com/leandro.nascimento.37266" target="_blank" rel="noopener noreferrer">
                    <img src={`${process.env.PUBLIC_URL}/imagens/facebook.png`} alt="Facebook de Leandro do Nascimento" />
                </a>
            </li>
            <li>
                <a href="twitter.com" target="_blank">
                    <img src={`${process.env.PUBLIC_URL}/imagens/twitter.png`} alt="" />
                </a>
            </li>
            <li>
                <a href="https://www.instagram.com/leandro_nscmt?psln=MTJmY3Q1cjI3M2R4cg==" target="_blank" rel="noopener noreferrer">
                    <img src={`${process.env.PUBLIC_URL}/imagens/instagram.png`} alt="Instagram de Leandro do Nascimento" />
                </a>
            </li>
        </ul>
       </section>
       <section>
       <img src={`${process.env.PUBLIC_URL}/imagens/logo.png`} alt="" />
       </section>
       <section>
        <p>
            Desenvolvido por &copy; Leandro do Nascimento.
        </p>
       </section>
    </footer>)
}

export default Rodape
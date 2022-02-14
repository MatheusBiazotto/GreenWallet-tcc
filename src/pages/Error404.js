import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

function Erro() {
  return (
    <>
      <div className="bg">
        <main className="bsod container">
          <h1 className="neg title">
            <span className="bg-span">Error - 404</span>
          </h1>
          <p>Ocorreu um erro ao acesar {useLocation().pathname} :</p>
          <p>
            * Retorne a página inicial.
            <br />* Entre em contato com a equipe de desenvolvedor enviando um email.
          </p>
          <nav className="nav404">
            <Link to="/" className="link404">
              Início
            </Link>
            &nbsp;|&nbsp;
            <a href="/#faq" className="link404">
              FAQ
            </a>
          </nav>
        </main>
      </div>
    </>
  );
}

export default Erro;

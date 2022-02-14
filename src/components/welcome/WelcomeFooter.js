const getYear = new Date().getFullYear();

//arrumar estilo
const hrStyle = {
  background: "white",
  textAlign: "center",
  width: "5rem",
};

const WelcomeFooter = () => (
  <>
    <footer className="footer mt-auto page-footer font-small unique-color-dark sticky-bottom">
      <div style={{ backgroundColor: "var(--purple)" }}>
        <div className="container">
          <div className="row py-4 d-flex align-items-center">
            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
              <h6 className="mb-0" style={{ font: "var(--bold)" }}>
                Acompanhe-nos nas redes sociais!
              </h6>
            </div>

            <div className="col-md-6 col-lg-7 text-center text-md-right">
              <a
                href="mailto:teamgreenwallet@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bx-envelope footer-icon"/>
              </a>

              <a
                href="https://github.com/GreenWallet-Team"
                target="_blank"
                rel="noreferrer"
              >
                 <i className="bx bxl-github footer-icon"/>
              </a>

              <a
                href="https://www.instagram.com/teamgreenwallet/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bx bxl-instagram footer-icon"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center text-md-left mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">GreenWallet</h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={hrStyle}
            />
            <p>Seu controle financeiro bem na palma de sua mão!</p>
          </div>

          <div
            id="linksFooter"
            className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
          >
            <h6 className="text-uppercase font-weight-bold">Aplicabilidades</h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={hrStyle}
            />
            <p>
              Controle de gastos
            </p>
            <p>
              Controle de lucros
            </p>
            <p>
              Históricos mensais
            </p>
            <p>
              E muito mais!
            </p>
          </div>

          <div
            id="linksFooter"
            className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"
          >
            <h6 className="text-uppercase font-weight-bold">Links úteis</h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={hrStyle}
            />
            <p>
              <a href="/login">Sua conta</a>
            </p>
            <p>
              <a href="/register">Cadastrar-se</a>
            </p>
            <p>
              <a
                href="https://greenwallet-team.github.io/assets/files/contract-user.pdf"
                target="_blank"
                rel="noreferrer"
              
              >Termos de Uso</a>
            </p>
            <p>
              <a href="/#faq">FAQs</a>
            </p>
          </div>

          <div
            id="linksFooter"
            className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
          >
            <h6 className="text-uppercase font-weight-bold">Contato</h6>
            <hr
              className="accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={hrStyle}
            />
            <p>Horário comercial (9h-17h)</p>
            <p>teamgreenwallet@gmail.com</p>
          </div>
        </div>
      </div>

      <div
        className="footer-copyright text-center py-3"
        style={{ fontSize: ".7rem" }}
        id="linksFooter"
      >
        <p>GreenWallet Team, {getYear} - Todos os direitos reservados &copy;</p>
        <p>
          Imagens fornecidas por{" "}
          <a
            className="linkFooter"
            href="https://icons8.com/illustrations/style--3d-flame"
            target="_blank"
            rel="noreferrer"
          >
            3D Flame
          </a>{" "} e {" "}
          <a
          className="linkFooter"
          href="https://icons8.com/illustrations/author/60896eeb088aa7001087bb4d"
          target="_blank"
          rel="noreferrer"
          >Rosina Gavrilash</a>
          &reg;
        </p>
      </div>
    </footer>
  </>
);

export default WelcomeFooter;

import { Link } from "react-router-dom";
import { Row, Col, Image, Button, Carousel } from "react-bootstrap";
import React, { useState } from "react";

import WelcomeFooter from "../components/welcome/WelcomeFooter.js";
import WelcomeMenu from "../components/welcome/WelcomeMenu.js";
import FormFaq from "../components/welcome/WelcomeFormFAQ.js";

const assets = [
  "https://greenwallet-team.github.io/assets/new-images/home.png",
  "https://greenwallet-team.github.io/assets/new-images/01.png",
  "https://greenwallet-team.github.io/assets/new-images/02.png",
  "https://greenwallet-team.github.io/assets/new-images/03.png",
  "https://greenwallet-team.github.io/assets/new-images/studying.png",
  "https://greenwallet-team.github.io/assets/new-images/building.png",
  "https://greenwallet-team.github.io/assets/new-images/flame-financial-analyst-robot.png",
  "https://greenwallet-team.github.io/assets/new-images/carrousel01.jpg",
  "https://greenwallet-team.github.io/assets/new-images/carrousel02.png",
  "https://greenwallet-team.github.io/assets/new-images/carrousel03.png",
  "https://greenwallet-team.github.io/assets/new-images/carrousel04.png",
  "https://greenwallet-team.github.io/assets/new-images/carrousel05.jpg",
  "https://greenwallet-team.github.io/assets/new-images/carrousel06.jpg",
];

function WelcomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {[
        { img: 9, text: "Time de desenvolvimento GreenWallet" },
        { img: 12, text: "Modernize seu controle financeiro" },
        { img: 8, text: "Venha para o greenwallet" },
        { img: 7, text: "Plataforma 100% gratuíta e completa" },
        { img: 10, text: "" },
        { img: 11, text: "Gerencie suas finanças" }
      ].map((img, index) => (
        <Carousel.Item key={index}>
          <Image
            className="d-block w-100"
            src={assets[img.img]}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>{img.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

const Welcome = () => (
  <>
    <div className="container-expand">
      <WelcomeMenu />
      <div className="welcome-card-1">
        <Row>
          <Col xs={window.screen.width > 767 ? 0 : 7}>
            <h1>Conheça o GreenWallet!</h1>
            <p>
              O GreenWallet é uma aplicação web para registro, administração e
              visualização de finanças, oferecendo ferramentas que buscam
              otimizar o processo e apresentar melhores formas de se utilizar e
              direcionar seu dinheiro, com uma interface intuitiva e
              convidativa.
            </p>
            <Link to="/register">
              <Button>Começar!</Button>
            </Link>
          </Col>
          <Col md="auto">
            <Image src={assets[0]} alt="home" id="img-card-1" />
          </Col>
        </Row>
      </div>
      <div className="welcome-card-2">
        <h4>Organize suas finanças em 5 minutos!</h4>
        <h6>Um sistema de gestão para te fazer não perder dinheiro!</h6>
      </div>
      <div className="welcome-card-3" id="about">
        <h4>Sobre Greenwallet: </h4>
        <div className="text">
          <p>
            O GreenWallet é uma aplicação web para registro, administração e
            visualização de finanças, oferecendo ferramentas que buscam otimizar
            o processo e apresentar melhores formas de se utilizar e direcionar
            seu dinheiro, com uma interface intuitiva e convidativa.
          </p>
          <p>
            Muitas pessoas possuem dificuldades em organizar suas finanças da
            maneira correta sem muitas dificuldades. Foi com isso em mente que
            iniciou-se o desenvolvimento de um aplicativo mobile e um site, o
            GreenWallet, ambos conectados por um banco de dados, onde haveria um
            melhor controle sobre todos os gastos do usuário, exibindo análises
            mensais através de gráficos e estatísticas, mostrando toda a
            movimentação feita na conta durante certo período. Além disso, o
            projeto também conta com notícias financeiras em tempo real, cotação
            de ações com potencial de crescimento e muito mais.
          </p>
        </div>
        <Image id="img01" src={assets[4]} alt="studying" />
        <div className="text">Confira abaixo algumas imagens da aplicação:</div>
        <div className="video-player">
          <WelcomeCarousel />
        </div>
        <div className="text">
          Dentro da aplicação, você encontrará diversas seções, funções e
          atributos pensados para a organização mais intuitiva e ao mesmo tempo
          detalhada o suficiente para torna-la uma ferramenta de uso frequente
          pelo usuário. <br />
          Entre as funções, estão:
          <ul style={{ marginLeft: "5%" }}>
            <li>Registro de gastos</li>
            <li>Registro de entradas (remuneração)</li>
            <li>Visualização de Gráficos</li>
            <li>Cotação de Moedas</li>
          </ul>
        </div>
        <Image src={assets[6]} alt="flame-financial-analyst-robot" />
        <div className="hr" />
        <h4>Equipe: </h4>
        <div className="text">
          A equipe GreenWallet é composta por alunos do 3º ETIM (Ensino técnico
          integrado ao médio) de Desenvolvimento de Sistemas (2021). Os alunos
          que fazem parte do projeto de criação dessa aplicação utilizaram da
          melhor instrução dada pelos profissionais da ETEC Euro Albino de
          Souza, assim como fizeram muitas pesquisas relacionadas ao tema da
          aplicação e diversas linguagens de programação e desenvolvimento de
          sistemas.
        </div>
        <Image src={assets[5]} alt="building" />
      </div>
      <div className="welcome-card-4" id="product">
        <Col>
          <h4>Faça seu cadastro!</h4>
          <div id="text-card">
            Obtenha acesso a todas as funcionalidades que o GreenWallet tem a
            oferecer criando uma conta com email e senha. É rápido, fácil e{" "}
            <strong>gratuito</strong>!
          </div>
        </Col>
        <Col sm>
          <Image src={assets[1]} alt="01" id="img-card-2" />
        </Col>
        <Col sm>
          <h4>Registre seus consumos!</h4>
          <div id="text-card">
            Registre seus gastos e ganhos, utilizando de categorias existentes
            ou criando suas próprias. Seus registros ficam salvos em sua conta e
            podem ser acessados em outros dispositivos através do login.
          </div>
        </Col>
        <Col sm>
          <Image src={assets[2]} alt="02" id="img-card-2" />
        </Col>
        <Col sm>
          <h4>Administre-os facilmente!</h4>
          <div id="text-card">
            No painel principal, você terá uma visão de todos os gastos, que
            podem ser analisados em diferentes visualizações, como mensais e
            anuais e diferentes tipos de gráficos.
          </div>
        </Col>
        <Col sm>
          <Image src={assets[3]} alt="03" id="img-card-2" />
        </Col>
        <Link to="/register">
          <Button>Cadastrar-me!</Button>
        </Link>
      </div>

      <div className="welcome-card-5" id="faq">
        <h3>Tem algum problema, questão ou dúvida?</h3>
        <h6>Envie uma mensagem explicando por meio do formlário abaixo: </h6>
        <div className="welcome-form-faq">
          <FormFaq />
        </div>
      </div>
    </div>
    <WelcomeFooter />
  </>
);

export default Welcome;

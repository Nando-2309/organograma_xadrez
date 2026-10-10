import { useState } from "react";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import { v4 as uuidv4 } from 'uuid';

const imagensJogadores = {
  'Paul Morphy': '01_Paul_Morphy.png',
  'Wilhelm Steinitz': '02_Wilhelm_Steinitz.png',
  'Emanuel Lasker': '03_Emanuel_Lasker.png',
  'Capablanca': '04_Jose_Raul_Capablanca.png',
  'Alexander Alekhine': '05_Alexander_Alekhine.png',
  'Max Euwe': '06_Max_Euwe.png',
  'Mikhail Botvinnik': '07_Mikhail_Botvinnik.png',
  'Vasily Smyslov': '08_Vasily_Smyslov.png',
  'Mikhail Tal': '09_Mikhail_Tal.png',
  'Tigran Petrosian': '10_Tigran_Petrosian.png',
  'Boris Spassky': '11_Boris_Spassky.png',
  'Bobby Fischer': '12_Bobby_Fischer.png',
  'Anatoly Karpov': '13_Anatoly_Karpov.png',
  'Garry Kasparov': '14_Garry_Kasparov.png',
  'Vladimir Kramnik': '15_Vladimir_Kramnik.png',
  'Veselin Topalov': '16_Veselin_Topalov.png',
  'Anand': '17_Viswanathan_Anand.png',
  'Magnus Carlsen': '18_Magnus_Carlsen.png',
  'Ding Liren': '19_Ding_Liren.png',
  'Gukesh D': '20_Gukesh_D.png'
};

function App() {

  const categoriasIniciais = [
  {
    "nome": "Os Monstros",
    "cor": "#57C278",
    "jogadores": [
      "Bobby Fischer",
      "Magnus Carlsen",
      "Garry Kasparov"
    ]
  },
  {
    "nome": "Os Universais",
    "cor": "#82CFFA",
    "jogadores": [
      "Boris Spassky",
      "Ding Liren",
      "Capablanca",
      "Anand"
    ]
  },
  {
    "nome": "Os Táticos ou Românticos",
    "cor": "#A6D157",
    "jogadores": [
      "Paul Morphy",
      "Mikhail Tal",
      "Alexander Alekhine"
    ]
  },
  {
    "nome": "Os Posicionais",
    "cor": "#E06B69",
    "jogadores": [
      "Tigran Petrosian",
      "Emanuel Lasker",
      "Wilhelm Steinitz",
      "Anatoly Karpov",
      "Vladimir Kramnik"
    ]
  },
  {
    "nome": "Os Subestimados",
    "cor": "#DB6EBF",
    "jogadores": [
      "Gukesh D",
      "Max Euwe",
      "Veselin Topalov",
      "Mikhail Botvinnik"
    ]
  },
  {
    "nome": "Os Clássicos",
    "cor": "#FFBA05",
    "jogadores": [
      "Vasily Smyslov"
    ]
  }
];

  const [times, setTimes] = useState(() => categoriasIniciais.map(({ nome, cor }) => ({
    id: uuidv4(), nome, cor
  })));

  const inicial = categoriasIniciais.flatMap(categoria => categoria.jogadores.map(nome => ({
    id: uuidv4(),
    favorito: false,
    nome,
    cargo: 'Jogador de xadrez',
    imagem: `/imagens/jogadores/${imagensJogadores[nome]}`,
    time: categoria.nome
  })));

  const [colaboradores, setColaboradores] = useState(inicial)

  function deletarColaborador(id) {
    setColaboradores(colaboradores.filter(colaborador => colaborador.id !== id));
  }

  function mudarCor(cor, id) {
    setTimes(times.map(time => {
      if(time.id === id) {
        time.cor = cor;
      }
      return time;
    }));
  }

  function cadastrarTime({ nome, cor }) {
    setTimes([...times, { nome, cor, id: uuidv4() }])
  }

  function resolverFavorito(id) {
    setColaboradores(colaboradores.map(colaborador => {
      if(colaborador.id === id) colaborador.favorito = !colaborador.favorito;
      return colaborador;
    }))
  }


  return (
    <div>
      <Banner />
      <Formulario aoCriarTime={cadastrarTime} times={times.map(time => time.nome)} aoCadastrar={colaborador => setColaboradores([...colaboradores, colaborador])} />
      <section className="times">
        <h1>Minha organização</h1>
        {times.map((time, indice) => <Time mudarCor={mudarCor} key={indice} time={time} colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)} aoDeletar={deletarColaborador} aoFavoritar={resolverFavorito} />)}
      </section>
      <Rodape />
    </div>
  );
}

export default App;

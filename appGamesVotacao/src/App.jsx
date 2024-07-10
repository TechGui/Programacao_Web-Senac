import React, { useEffect, useState } from 'react';
import Titulo from "./components/Titulo";
import ListaJogo from "./components/ListaJogo";
import NovoJogo from "./components/NovoJogo";
import './App.css';
import 'react-responsive-modal/styles.css';
import { Toaster } from "sonner";
import { Modal } from 'react-responsive-modal';
import axios from 'axios';

const API_URL = 'http://localhost:3000/jogos';

function App() {
  const [jogos, setJogos] = useState([]);
  const [openNovoJogo, setOpenNovoJogo] = useState(false);
  const [openRanking, setOpenRanking] = useState(false);

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const response = await axios.get(API_URL);
        setJogos(response.data);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);

      }
    };

    fetchJogos();
  }, []);

  const ordenarJogosPorVotos = (jogos) => {
    return jogos.sort((a, b) => b.votos - a.votos);
  };

  const jogosOrdenados = ordenarJogosPorVotos(jogos);

  return (
    <>
      <Titulo />
      <div className="container">
        <div className="lista-novo">
          <h1>Jogos Disponíveis para Votação</h1>
          <button className="bt-novo" onClick={() => setOpenNovoJogo(true)}>Cadastrar Jogo</button>
          <button className="bt-ranking" onClick={() => setOpenRanking(true)}>Ver Ranking</button>
        </div>
        <Modal open={openNovoJogo} onClose={() => setOpenNovoJogo(false)} center>
          <NovoJogo jogos={jogos} setJogos={setJogos} />
        </Modal>
    
        <Modal open={openRanking} onClose={() => setOpenRanking(false)} center>
          <h2 className="titulo-ranking">Ranking dos Jogos</h2>
          <div className="ranking-container">
            {jogosOrdenados.map((jogo, index) => (
              <div key={jogo.id} className="ranking-item">
                <span>{index + 1}. {jogo.nome} - {jogo.votos} votos</span> {}
              </div>
            ))}
          </div>
        </Modal>
          <ListaJogo jogos={jogosOrdenados} setJogos={setJogos} />
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;



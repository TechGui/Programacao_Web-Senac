import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { toast } from 'sonner';
import axios from 'axios';
import './ListaJogo.css'; 

const API_URL = 'http://localhost:3000/jogos';

const ListaJogo = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const response = await axios.get(API_URL);
        setJogos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar jogos!");
        console.error('Error fetching games:', error);
      }
    };

    fetchJogos();
  }, []);

  const avaliaJogo = async (id) => {
    const email = prompt("Digite seu e-mail para confirmar a avaliação:");
    if (!email) {
      toast.error("O e-mail é necessário para votar!");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${id}/vote`, { email });
      setJogos(jogos.map(j => j.id === id ? response.data : j));
      toast.success(`Ok! Voto computado com sucesso para o jogo ${response.data.nome}!`);
    } catch (error) {
      toast.error("Erro ao computar o voto!");
      console.error('Error voting for game:', error);
    }
  };

  const verDetalhes = async (jogoId) => {
    try {
      const response = await axios.get(`${API_URL}/${jogoId}/emails`);
      const emails = response.data.join(", ");
      if (!emails) {
        return alert("Nenhum email encontrado para este jogo.");
      }
      
      alert(`Emails dos usuários que votaram: \n${emails}`);
    } catch (error) {
      if (error.response) {
        toast.error('Erro ao obter detalhes dos emails.');
        console.error('Erro inesperado:', error.message);
      }
    }
  };

  const apagaJogo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setJogos(jogos.filter(j => j.id !== id));
      toast.success('Jogo apagado com sucesso!');
    } catch (error) {
      toast.error('Erro ao apagar jogo!');
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div className="grid-container">
      {jogos.map(jogo => (
        <div key={jogo.id} className="card-jogo">
          <img className='urlImagem' src={jogo.urlImagem} alt="Imagem do Jogo" />
          <div className='lista_descricao'>
          <img className='excluirJogo' src="./excluir.png" alt="Botão para excluir um jogo" onClick={() => apagaJogo(jogo.id)} />

            <h2 className='jogo_nome'>{jogo.nome}</h2>
            <p>{jogo.desenvolvedora}</p>
            <p className='jogo_genero'>{jogo.genero}</p>
            <p className='jogo_ano'>Ano de Lançamento: {jogo.dataLancamento}</p>
            <button onClick={() => avaliaJogo(jogo.id)}>Avaliar Jogo <FaCheck /></button>
            {jogo.votos === 0 ?
              <img src="./novo.png" alt="Novidade" className='novidade'/>
              :
              <div className='votacao_detalhes'>
                <button className='botao_ver-emails' onClick={() => verDetalhes(jogo.id)}>Ver detalhes...</button>
                <p className='votos'>{jogo.votos} votos </p>
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaJogo;

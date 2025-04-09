import React, { useState, useEffect } from 'react';
import api from '../services/api';  // Usando a instância do axios
import './CharacterCard.css';  // Estilos para o card dos personagens

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza a requisição usando a instância do axios
        const response = await api.get();
        console.log('Dados recebidos:', response.data);  // Verifica se os dados estão corretos
        setCharacters(response.data);  // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);  // O useEffect roda uma vez, quando o componente for montado

  // Filtra os personagens com base no termo de busca
  const filteredCharacters = characters.filter(character =>
    (character.name && character.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (character.house && character.house.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Exibe a mensagem "Carregando..." enquanto os dados estão sendo carregados
  if (characters.length === 0) {
    return <p>Carregando personagens...</p>;
  }

  return (
    <div className="container">
      {/* Campo de pesquisa */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar personagem"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Atualiza o termo de pesquisa
        />
      </div>

      <div className="card-list">
        {filteredCharacters.length === 0 ? (
          <p>Nenhum personagem encontrado.</p>  // Exibe mensagem caso não haja resultados
        ) : (
          filteredCharacters.map(character => (
            <div key={character.name} className="character-card">
              <h3>{character.name}</h3>
              {character.image ? (
                <img src={character.image} alt={character.name} />
              ) : (
                <img src="url_fallback_imagem.jpg" alt="Imagem não disponível" />
              )}
              <p>{character.house}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CharactersList;

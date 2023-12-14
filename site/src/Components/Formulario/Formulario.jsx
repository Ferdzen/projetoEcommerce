import React, { useState, useEffect } from 'react';
import './Formulario.css';

const Formulario = ({ campos, onSubmit, itemSelecionado, onUpdate }) => {
  const [dadosDoFormulario, setDadosDoFormulario] = useState({});

  const eventoChange = (campo, valor) => {
    setDadosDoFormulario({
      ...dadosDoFormulario,
      [campo]: valor,
    });
  };

  const eventoSubmit = (e) => {
    
    //tentando verificar senha
    if(dadosDoFormulario.Senha !== dadosDoFormulario.confirmarSenha){
      alert('As senhas não coincidem.');
      return;
    }
    
    //e.preventDefault();
    if(itemSelecionado){
      onUpdate(dadosDoFormulario)
    }else{
      onSubmit(dadosDoFormulario);
    }
  };

  useEffect(() => {
    if (itemSelecionado) {
      setDadosDoFormulario(itemSelecionado.resultado[0]);
      console.log(dadosDoFormulario)
    }
  }, [itemSelecionado]);
  
  return (
    <form onSubmit={eventoSubmit}>
      {campos.map((campo) => (
        <div key={campo.nome} className='divForm'>
          <label className='largura'>{campo.label}</label>
          <input
            type={campo.tipo}
            value={dadosDoFormulario[campo.nome] || ''}
            onChange={(e) => eventoChange(campo.nome, e.target.value)}
          />
        </div>
      ))}
      <button  type="submit">Salvar</button>
    </form>
  );
};

export default Formulario;

import React, { useState, useEffect } from 'react';
import Formulario from '../../components/Formulario';
import api from '../../services/api';
import Tabela from '../../Components/Tabela';

const CadastroUsuario = () => {
  const [mensagem, setMensagem] = useState('');
  const [users, setUsers] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);


  const listaForm = [
    { nome: 'nome', label: 'Nome', tipo: 'text' },
    { nome: 'login', label: 'Login', tipo: 'text' },
    { nome: 'senha', label: 'Senha', tipo: 'text' },
    { nome: 'csenha', label: 'Confirmar Senha', tipo: 'text' },
    { nome: 'email', label: 'E-mail', tipo: 'text' },
    { nome: 'dataNasc', label: 'Data de Nascimento', tipo: 'text' },
  ];

  const colunasUsers = ['id', 'nome', 'login', 'senha', 'email', 'dataNasc'];


  
  const enviarFormulario = async (dadosDoFormulario) => {
    try {
      await api.gravarUser(dadosDoFormulario)

      setMensagem('Usuário salvo com sucesso');
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error.message);
      setMensagem('Erro ao salvar o usuário');
    }
  };

  const editarFormulario = async (dadosDoFormulario) => {
    try {
      await api.atualizarUser(dadosDoFormulario)

      setMensagem('Usuário editado com sucesso');
    } catch (error) {
      console.error('Erro ao editar o usuário:', error.message);
      setMensagem('Erro ao editar o produto');
    }
  };


  useEffect(() => {
    const carregarUsers = async () => {
      try {
        const dados = await api.getUsers();
        setUsers(dados);
      } catch (error) {
        console.error('Erro ao carregar os usuários:', error.message);
      }
    };

    carregarUsers();
  }, []);

  const excluirUser = async (id) => {
    try {
      await api.excluirUser(id);
      const novaLista = users.filter((user) => user.id !== id);
      setUsers(novaLista);
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error.message);
    }
  };

  const editarUser = async (id) => {
    try {
      const userSelecionado = await api.buscarUserPorId(id);
      setItemSelecionado(userSelecionado);
      console.log(itemSelecionado)
    } catch (error) {
      console.error('Erro ao carregar dados do usuário para edição:', error.message);
    }
  };
  

  return (
    <div className="classeCSS">
      <h1>Cadastro de Usuário</h1>
      <Formulario 
        campos={listaForm} 
        onSubmit={enviarFormulario} 
        itemSelecionado={itemSelecionado}
        onUpdate={editarFormulario}/>
      {mensagem && <p>{mensagem}</p>}
   
    <h2>Usuários Cadastrados</h2>
      <Tabela
        dados={users}
        onExcluirItem={excluirUser}
        onEditarItem={editarUser}
        colunas={colunasUsers}
      />
    </div>
  );
};

export default CadastroUsuario;

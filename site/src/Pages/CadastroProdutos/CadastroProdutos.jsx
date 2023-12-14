import React, { useState, useEffect } from 'react';
import './CadastroProdutos.css';
import Formulario from '../../components/Formulario';
import api from '../../services/api';
import Tabela from '../../Components/Tabela';

const CadastroProduto = () => {
  const [mensagem, setMensagem] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);


  const listaForm = [
    { nome: 'nome', label: 'Nome', tipo: 'text' },
    { nome: 'preco', label: 'Preço unitário', tipo: 'number' },
    { nome: 'qtd', label: 'Quantidade', tipo: 'number' },
  ];

  const colunasProdutos = ['id', 'nome', 'preco', 'qtd'];


  
  const enviarFormulario = async (dadosDoFormulario) => {
    try {
      await api.gravarProduto(dadosDoFormulario)

      setMensagem('Produto salvo com sucesso');
    } catch (error) {
      console.error('Erro ao salvar o produto:', error.message);
      setMensagem('Erro ao salvar o produto');
    }
  };

  const editarFormulario = async (dadosDoFormulario) => {
    try {
      await api.atualizarProduto(dadosDoFormulario)

      setMensagem('Produto editado com sucesso');
    } catch (error) {
      console.error('Erro ao editar o produto:', error.message);
      setMensagem('Erro ao editar o produto');
    }
  };


  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const dados = await api.getProdutos();
        setProdutos(dados);
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error.message);
      }
    };

    carregarProdutos();
  }, []);

  const excluirProduto = async (id) => {
    try {
      await api.excluirProduto(id);
      const novaLista = produtos.filter((produto) => produto.id !== id);
      setProdutos(novaLista);
    } catch (error) {
      console.error('Erro ao excluir o produto:', error.message);
    }
  };

  const editarProduto = async (id) => {
    try {
      const produtoSelecionado = await api.buscarProdutoPorId(id);
      setItemSelecionado(produtoSelecionado);
      console.log(itemSelecionado)
    } catch (error) {
      console.error('Erro ao carregar dados do produto para edição:', error.message);
    }
  };
  

  return (
    <div className="classeCSS">
      <h1>Cadastro de Produto</h1>
      <Formulario 
        campos={listaForm} 
        onSubmit={enviarFormulario} 
        itemSelecionado={itemSelecionado}
        onUpdate={editarFormulario}/>
      {mensagem && <p>{mensagem}</p>}
   
    <h2>Produtos Cadastrados</h2>
      <Tabela
        dados={produtos}
        onExcluirItem={excluirProduto}
        onEditarItem={editarProduto}
        colunas={colunasProdutos}
      />
    </div>
  );
};

export default CadastroProduto;

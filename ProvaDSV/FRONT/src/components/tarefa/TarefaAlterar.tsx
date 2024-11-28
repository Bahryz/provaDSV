import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";
import { Categoria } from "../../models/Categoria";
import axios from "axios";

function TarefaAlterar() {
  const { tarefaId } = useParams();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    if (tarefaId) {
      axios
        .get<Tarefa>(`http://localhost:5000/api/tarefa/listar/${tarefaId}`)
        .then((resposta) => {
          setTitulo(resposta.data.titulo);
          setDescricao(resposta.data.descricao);
          setCategoriaId(resposta.data.categoriaId);  
        });
    }
    buscarCategorias();
  }, [tarefaId]);

  function buscarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categorias/listar") 
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }

  function enviarTarefa(e: React.FormEvent) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo,
      descricao,
      categoriaId,
    };

    axios
      .put(`http://localhost:5000/api/tarefa/alterar/${tarefaId}`, tarefa)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div id="alterar-tarefa" className="container">
      <h1>Alterar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="titulo"
            value={titulo}
            required
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            name="descricao"
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Alterar Tarefa</button>
      </form>
    </div>
  );
}

export default TarefaAlterar;

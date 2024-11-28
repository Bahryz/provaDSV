import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import styles from "./CadastrarTarefa.module.css";
import { Categoria } from "../../models/Categoria";

function TarefaCadastrar() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias) => {
        setCategorias(categorias);
        console.table(categorias);
      });
  }, []);

  function enviarTarefa(e: React.FormEvent) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
    };

    fetch("http://localhost:5000/api/tarefa/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => resposta.json())
      .then((tarefa) => {
        console.log(tarefa);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar a tarefa:", error);
      });
  }

  return (
    <div id="cadastro-tarefa" className={styles["cadastro-tarefa"]}>
      <h1 className={styles.h1}>Cadastrar Tarefa</h1>
      <form onSubmit={enviarTarefa} className={styles.form}>
        <div className={styles["form-group"]}>
          <label htmlFor="nome">Nome</label>
          <input
            onChange={(e) => setTitulo(e.target.value)}
            type="text"
            id="nome"
            name="nome"
            required
            placeholder="Digite o nome da tarefa"
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            onChange={(e) => setDescricao(e.target.value)}
            id="descricao"
            name="descricao"
            required
            placeholder="Digite a descrição da tarefa"
          ></textarea>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="categorias">Categorias</label>
          <select
            id="categoria"
            onChange={(e) => setCategoriaId(e.target.value)}
            value={categoriaId} 
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["form-actions"]}>
          <button type="submit">Cadastrar Tarefa</button>
        </div>
      </form>
    </div>
  );
}

export default TarefaCadastrar;

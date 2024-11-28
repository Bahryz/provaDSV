import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import { Link } from "react-router-dom";
import axios from "axios";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    consultarTarefas();
  }, []);

  function consultarTarefas() {
    axios
      .get<Tarefa[]>("http://localhost:5000/api/tarefas/listar")
      .then((resposta) => {
        setTarefas(resposta.data);
        console.table(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao listar tarefas:", erro);
      });
  }

  function Concluidas() {
    axios
      .get<Tarefa[]>("http://localhost:5000/tarefas/concluida")
      .then((resposta) => {
        setTarefas(resposta.data);
        console.table(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao listar as tarefas concluídas:", erro);
      });
  }

  function NaoConcluidas() {
    axios
      .get<Tarefa[]>("http://localhost:5000/tarefas/naoconcluidas")
      .then((resposta) => {
        setTarefas(resposta.data);
        console.table(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao listar tarefas não concluídas:", erro);
      });
  }



  return (
    <div id="listar-tarefas" className="container">
      <h1>Listar Tarefas</h1>
      <div>
        <button onClick={Concluidas}>Tarefas Concluídas</button>
        <button onClick={NaoConcluidas}>Tarefas Não Concluídas</button>
        <button onClick={consultarTarefas}>Todas as Tarefas</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Criado em</th>
            <th>Deletar</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.criadoEm}</td>
              <td>
                <Link to={`/pages/tarefa/alterar/${tarefa.tarefaId}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaListar;

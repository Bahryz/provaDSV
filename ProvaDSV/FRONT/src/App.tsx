import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./styles.css";
import TarefaAlterar from "./components/tarefa/TarefaAlterar";
import TarefaCadastrar from "./components/tarefa/TarefaCadastrar";
import TarefaListar from "./components/tarefa/TarefaListar";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/pages/tarefa/listar">
                {" "}
                Listar Tarefas{" "}
              </Link>
            </li>
            <li>
              <Link to="/pages/produto/cadastrar">
                {" "}
                Cadastrar Tarefas{" "}
              </Link>
            </li>
          </ul>
        </nav>
        <div id="conteudo">
          <Routes>
            <Route path="/" element={<TarefaListar/>} />
            <Route
              path="/pages/tarefa/listar"
              element={<TarefaListar/>}
            />
            <Route
              path="/pages/tarefa/cadastrar"
              element={<TarefaCadastrar/>}
            />
            <Route
              path="/pages/tarefa/alterar/:tarefaId"
              element={<TarefaAlterar />}
            />
          </Routes>
        </div>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;

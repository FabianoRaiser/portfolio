import { Atuacao } from "./components/Atuacao"
import { Contato } from "./components/Contato"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Projetos } from "./components/Projetos"
import { Sobre } from "./components/Sobre"
import { Videos } from "./components/Videos"
import { perfil } from "./data/perfil"

export function App() {
  return (
    <>
      <a className="pular" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="pagina">
        <Header />
        <main id="conteudo">
          <Hero />
          <Sobre />
          <Projetos />
          <Videos />
          <Atuacao />
          <Contato />
        </main>
        <footer className="rodape">
          <p>Feito com Vite, React e CSS.</p>
          <p>
            {perfil.cidade} · {perfil.pronome}
          </p>
        </footer>
      </div>
    </>
  )
}

import { perfil } from "../data/perfil"
import { Terminal } from "./Terminal"

const canais = [
  { rotulo: "GitHub", href: perfil.github },
  { rotulo: "LinkedIn", href: perfil.linkedin },
  { rotulo: "Instagram", href: perfil.instagram },
]

export function Contato() {
  return (
    <section className="secao" id="contato" aria-labelledby="titulo-contato">
      <h2 id="titulo-contato" className="secao__titulo">
        Contato
      </h2>
      <p className="contato__chamada">
        Para falar de arquitetura, API ou uma vaga, escreva ou ligue.
      </p>
      <div className="contato__linhas">
        <a className="contato__email" href={`mailto:${perfil.email}`}>
          {perfil.email}
        </a>
        <a className="contato__telefone" href={perfil.telefoneHref}>
          {perfil.telefone}
        </a>
      </div>
      <ul className="contato__canais">
        {canais.map((canal) => (
          <li key={canal.href}>
            <a href={canal.href} target="_blank" rel="noreferrer">
              {canal.rotulo}
            </a>
          </li>
        ))}
      </ul>
      <Terminal />
    </section>
  )
}

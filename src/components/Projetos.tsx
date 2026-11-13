import { projetos } from "../data/projetos"

export function Projetos() {
  return (
    <section className="secao" id="projetos" aria-labelledby="titulo-projetos">
      <h2 id="titulo-projetos" className="secao__titulo">
        Projetos
      </h2>
      <ol className="projetos">
        {projetos.map((projeto) => (
          <li key={projeto.titulo} className="projeto projeto--texto">
            <article>
              <div className="projeto__corpo">
                <h3 className="projeto__titulo">{projeto.titulo}</h3>
                <p className="projeto__texto">{projeto.descricao}</p>
                <p className="projeto__meta">
                  <span>{projeto.ano}</span>
                  <span>{projeto.stack.join(" · ")}</span>
                </p>
                <ul className="projeto__links">
                  {projeto.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.rotulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

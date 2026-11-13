import { atuacoes } from "../data/atuacao"

export function Atuacao() {
  return (
    <section className="secao" id="atuacao" aria-labelledby="titulo-atuacao">
      <h2 id="titulo-atuacao" className="secao__titulo">
        Atuação
      </h2>
      <ol className="projetos">
        {atuacoes.map((item) => (
          <li key={item.cargo} className="projeto projeto--texto">
            <article>
              <div className="projeto__corpo">
                <h3 className="projeto__titulo">{item.cargo}</h3>
                <p className="projeto__meta">
                  <span>{item.periodo}</span>
                  <span>{item.contexto}</span>
                </p>
                <div className="projeto__texto">
                  {item.texto.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

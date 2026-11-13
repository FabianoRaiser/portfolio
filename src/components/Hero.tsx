import { perfil } from "../data/perfil"

const atalhos = [
  { rotulo: "GitHub", href: perfil.github },
  { rotulo: "LinkedIn", href: perfil.linkedin },
  { rotulo: "E-mail", href: `mailto:${perfil.email}` },
]

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="titulo-inicio">
      <p className="hero__olho">
        {perfil.cargo} · {perfil.cidade}
      </p>
      <div className="hero__grade">
        <h1 id="titulo-inicio" className="hero__nome">
          {perfil.nome}
        </h1>
        <figure className="hero__retrato">
          <img src="/retrato.jpg" alt="Foto de Fabiano Raiser" width="136" height="136" />
        </figure>
        <div className="hero__texto">
          <p>
            APIs, arquitetura modular e a saída do monolito. Pleno na Excellent
            Sistemas.
          </p>
          <ul className="hero__links">
            {atalhos.map((atalho) => (
              <li key={atalho.rotulo}>
                <a
                  href={atalho.href}
                  {...(atalho.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {atalho.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

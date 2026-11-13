import { useSecaoAtiva } from "../useSecaoAtiva"
import { perfil } from "../data/perfil"

const links = [
  { id: "sobre", rotulo: "Sobre" },
  { id: "projetos", rotulo: "Projetos" },
  { id: "videos", rotulo: "Vídeos" },
  { id: "atuacao", rotulo: "Atuação" },
  { id: "contato", rotulo: "Contato" },
]

export function Header() {
  const ativa = useSecaoAtiva()

  return (
    <header className="topo">
      <a className="topo__marca" href="#inicio">
        {perfil.apelido}
      </a>
      <nav className="topo__nav" aria-label="Seções da página">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={ativa === link.id ? "true" : undefined}
          >
            {link.rotulo}
          </a>
        ))}
      </nav>
    </header>
  )
}

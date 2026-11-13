import { useRef, useState, type FormEvent, type MouseEvent } from "react"
import { createPortal } from "react-dom"
import { CotaDeMalha, prepararEspada, type FaseDaCota } from "./CotaDeMalha"
import { perfil } from "../data/perfil"

const links = [
  { texto: "GitHub", href: perfil.github },
  { texto: "LinkedIn", href: perfil.linkedin },
  { texto: "Instagram", href: perfil.instagram },
]

const ajuda = `Comandos:
  <enter>                       Busca esta página
  <url>                         Busca uma URL e imprime a página
  links                         Lista os links da página atual
  go <n>                        Abre o link N
  help                          Mostra esta ajuda
  quit                          Limpa o terminal

Flags:
  --chainmail                   Veste ou retira a cota de malha
                                O ponteiro vira uma espada`

type Bloco =
  | { id: number; tipo: "comando"; texto: string }
  | { id: number; tipo: "texto"; texto: string }
  | { id: number; tipo: "pagina" }

type Acao =
  | { tipo: "pagina" }
  | { tipo: "eco" }
  | { tipo: "help" }
  | { tipo: "links" }
  | { tipo: "clear" }
  | { tipo: "go"; n: string | undefined }

function interpretar(bruto: string): { acao: Acao; vestir: boolean } {
  const partes = bruto.trim().split(/\s+/).filter(Boolean)
  const vestir = partes.includes("--chainmail")
  const resto = partes.filter((parte) => parte !== "--chainmail" && parte !== "curler")
  const comando = resto[0] ?? ""

  if (!comando) return { acao: vestir ? { tipo: "eco" } : { tipo: "pagina" }, vestir }
  if (comando === "help" || comando === "--help" || comando === "-h") return { acao: { tipo: "help" }, vestir }
  if (comando === "links") return { acao: { tipo: "links" }, vestir }
  if (comando === "quit" || comando === "exit" || comando === "clear") return { acao: { tipo: "clear" }, vestir }
  if (comando === "go") return { acao: { tipo: "go", n: resto[1] }, vestir }
  return { acao: { tipo: "pagina" }, vestir }
}

export function Terminal() {
  const campo = useRef<HTMLInputElement>(null)
  const sequencia = useRef(0)
  const [blocos, setBlocos] = useState<Bloco[]>([])
  const [comando, setComando] = useState("")
  const [paginaCarregada, setPaginaCarregada] = useState(false)
  const [cota, setCota] = useState<FaseDaCota>("ausente")

  const identificar = () => {
    sequencia.current += 1
    return sequencia.current
  }

  const focar = (evento: MouseEvent<HTMLDivElement>) => {
    if (evento.target instanceof HTMLInputElement) return
    campo.current?.focus()
  }

  const alternarCota = () => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setCota((atual) => {
      if (atual === "vestindo") return reduzido ? "ausente" : "tirando"
      return "vestindo"
    })
  }

  const enviar = (evento: FormEvent) => {
    evento.preventDefault()
    const digitado = comando
    const { acao, vestir } = interpretar(digitado)
    const proximos: Bloco[] = [{ id: identificar(), tipo: "comando", texto: digitado }]

    if (acao.tipo === "clear") {
      setBlocos([])
      setPaginaCarregada(false)
      setCota("ausente")
      setComando("")
      return
    }

    if (vestir) {
      prepararEspada()
      alternarCota()
    }

    if (acao.tipo === "help") {
      proximos.push({ id: identificar(), tipo: "texto", texto: ajuda })
    }

    if (acao.tipo === "links") {
      const texto = paginaCarregada
        ? links.map((link, indice) => `  [${indice + 1}] ${link.texto} (${link.href})`).join("\n")
        : "No page loaded."
      proximos.push({ id: identificar(), tipo: "texto", texto })
    }

    if (acao.tipo === "go") {
      if (!paginaCarregada) {
        proximos.push({ id: identificar(), tipo: "texto", texto: "No page loaded." })
      } else if (!acao.n || Number.isNaN(Number(acao.n))) {
        proximos.push({ id: identificar(), tipo: "texto", texto: "Usage: go <n>" })
      } else {
        const link = links[Number(acao.n) - 1]
        proximos.push({
          id: identificar(),
          tipo: "texto",
          texto: link ? link.href : `Link ${acao.n} not found.`,
        })
      }
    }

    if (acao.tipo === "pagina") {
      proximos.push({ id: identificar(), tipo: "pagina" })
      setPaginaCarregada(true)
    }

    setBlocos((atuais) => [...atuais, ...proximos])
    setComando("")
  }

  const aviso =
    cota === "vestindo"
      ? "A página está vestida com uma cota de malha."
      : cota === "tirando"
        ? "A cota de malha está saindo."
        : ""

  return (
    <div className="terminal" onClick={focar}>
      <p className="somente-leitor" aria-live="polite">
        {aviso}
      </p>
      <div className="terminal__saida" aria-live="polite">
        {blocos.map((bloco) => {
          if (bloco.tipo === "comando") {
            return (
              <p key={bloco.id} className="terminal__eco">
                <span className="terminal__marca">curler&gt;</span> {bloco.texto}
              </p>
            )
          }
          if (bloco.tipo === "pagina") {
            return (
              <div key={bloco.id} className="terminal__pagina">
                <p className="terminal__titulo">{perfil.nome}</p>
                <p>
                  Desenvolvedor backend. Arquitetura de soluções em {perfil.cidade}.
                </p>
                <p>APIs, arquitetura modular e a saída do monolito.</p>
                <p className="terminal__rodape">({links.length} links — use links)</p>
              </div>
            )
          }
          return (
            <pre key={bloco.id} className="terminal__texto">
              {bloco.texto}
            </pre>
          )
        })}
      </div>
      <form className="terminal__linha" onSubmit={enviar}>
        <label className="terminal__prompt">
          <span className="terminal__marca">curler&gt;</span>
          <input
            ref={campo}
            className="terminal__campo"
            value={comando}
            onChange={(evento) => setComando(evento.target.value)}
            aria-label="Comando do Curler"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder=" "
          />
        </label>
      </form>
      {cota !== "ausente" &&
        createPortal(
          <CotaDeMalha fase={cota} aoTerminar={() => setCota("ausente")} />,
          document.body,
        )}
    </div>
  )
}

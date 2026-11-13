import { useEffect, useState } from "react"

const SECOES = ["inicio", "sobre", "projetos", "videos", "atuacao", "contato"]
const LINHA = 120

export function useSecaoAtiva() {
  const [ativa, setAtiva] = useState(SECOES[0])

  useEffect(() => {
    const atualizar = () => {
      let atual = SECOES[0]

      for (const id of SECOES) {
        const secao = document.getElementById(id)
        if (secao && secao.getBoundingClientRect().top <= LINHA) {
          atual = id
        }
      }

      setAtiva(atual)
    }

    atualizar()
    window.addEventListener("scroll", atualizar, { passive: true })
    return () => window.removeEventListener("scroll", atualizar)
  }, [])

  return ativa
}

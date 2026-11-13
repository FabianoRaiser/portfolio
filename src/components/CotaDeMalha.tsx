import { useEffect, useRef, type AnimationEvent } from "react"

const PASSO_X = 32
const PASSO_Y = 14
const RAIO = 13

export type FaseDaCota = "ausente" | "vestindo" | "tirando"

export function CotaDeMalha({ fase, aoTerminar }: { fase: FaseDaCota; aoTerminar: () => void }) {
  const tela = useRef<HTMLCanvasElement>(null)

  const terminar = (evento: AnimationEvent<HTMLDivElement>) => {
    if (evento.animationName === "desveste") aoTerminar()
  }

  useEffect(() => {
    const canvas = tela.current
    if (!canvas) return
    const contexto = canvas.getContext("2d")
    if (!contexto) return

    const desenhar = () => {
      const densidade = Math.min(window.devicePixelRatio || 1, 2)
      const largura = window.innerWidth
      const altura = window.innerHeight
      canvas.width = Math.round(largura * densidade)
      canvas.height = Math.round(altura * densidade)
      canvas.style.width = `${largura}px`
      canvas.style.height = `${altura}px`
      contexto.setTransform(densidade, 0, 0, densidade, 0, 0)
      contexto.clearRect(0, 0, largura, altura)
      contexto.lineWidth = 1.6
      contexto.strokeStyle = "#8fce63"
      contexto.globalAlpha = 0.58
      contexto.beginPath()
      const linhas = Math.ceil(altura / PASSO_Y) + 2
      const colunas = Math.ceil(largura / PASSO_X) + 2
      for (let linha = -1; linha < linhas; linha += 1) {
        const deslocado = linha % 2 === 0
        for (let coluna = -1; coluna < colunas; coluna += 1) {
          const x = coluna * PASSO_X + (deslocado ? PASSO_X / 2 : 0)
          const y = linha * PASSO_Y
          contexto.moveTo(x + RAIO, y)
          contexto.arc(x, y, RAIO, 0, Math.PI * 2)
        }
      }
      contexto.stroke()
      contexto.globalAlpha = 1
    }

    desenhar()
    window.addEventListener("resize", desenhar)
    return () => window.removeEventListener("resize", desenhar)
  }, [])

  return (
    <div className={`cota cota--${fase}`} onAnimationEnd={terminar} aria-hidden="true">
      <canvas ref={tela} className="cota__anel" />
    </div>
  )
}

import { useEffect, useRef, type AnimationEvent } from "react"

const PASSO_X = 32
const PASSO_Y = 14
const RAIO = 13
const ALCANCE = 86
const DESLOCAMENTO_MAXIMO = 6

type Anel = {
  origemX: number
  origemY: number
  x: number
  y: number
  vx: number
  vy: number
  solto: boolean
}

export type FaseDaCota = "ausente" | "vestindo" | "tirando"

const GOLPE = "/mixkit-sword-blade-lashes-chainmail-armor-2776.wav"

let audio: AudioContext | null = null
let amostra: AudioBuffer | null = null
let carga: Promise<void> | null = null
let fonte: AudioBufferSourceNode | null = null
let volume: GainNode | null = null
let silencio: number | null = null
let querSom = false

export function prepararEspada() {
  const Contexto = window.AudioContext
  if (!Contexto) return
  if (!audio) audio = new Contexto()
  if (audio.state === "suspended") void audio.resume()
  if (carga || amostra) return
  const contexto = audio
  carga = fetch(GOLPE)
    .then((resposta) => resposta.arrayBuffer())
    .then((dados) => contexto.decodeAudioData(dados))
    .then((buffer) => {
      amostra = buffer
      if (querSom) tocarGolpe()
    })
    .catch(() => {
      carga = null
    })
}

function tocarGolpe() {
  querSom = true
  if (!audio || !amostra) return
  if (audio.state === "suspended") void audio.resume()
  if (silencio !== null) {
    window.clearTimeout(silencio)
    silencio = null
  }
  if (!fonte) {
    volume = audio.createGain()
    volume.gain.value = 0.8
    volume.connect(audio.destination)
    fonte = audio.createBufferSource()
    fonte.buffer = amostra
    fonte.loop = true
    fonte.connect(volume)
    fonte.start()
  }
  silencio = window.setTimeout(calarEspada, 160)
}

export function calarEspada() {
  querSom = false
  if (silencio !== null) {
    window.clearTimeout(silencio)
    silencio = null
  }
  if (!audio || !fonte || !volume) {
    fonte = null
    volume = null
    return
  }
  const agora = audio.currentTime
  const ganho = volume
  const tocando = fonte
  fonte = null
  volume = null
  ganho.gain.cancelScheduledValues(agora)
  ganho.gain.setValueAtTime(ganho.gain.value, agora)
  ganho.gain.linearRampToValueAtTime(0.0001, agora + 0.08)
  tocando.stop(agora + 0.09)
}

function tecer(largura: number, altura: number) {
  const aneis: Anel[] = []
  const grade = new Map<string, Anel[]>()
  const linhas = Math.ceil(altura / PASSO_Y) + 2
  const colunas = Math.ceil(largura / PASSO_X) + 2

  for (let linha = -1; linha < linhas; linha += 1) {
    const deslocado = linha % 2 === 0
    for (let coluna = -1; coluna < colunas; coluna += 1) {
      const x = coluna * PASSO_X + (deslocado ? PASSO_X / 2 : 0)
      const y = linha * PASSO_Y
      const anel: Anel = { origemX: x, origemY: y, x, y, vx: 0, vy: 0, solto: false }
      aneis.push(anel)
      const chave = `${Math.floor(x / PASSO_X)}:${Math.floor(y / PASSO_Y)}`
      const celula = grade.get(chave)
      if (celula) celula.push(anel)
      else grade.set(chave, [anel])
    }
  }

  return { aneis, grade }
}

export function CotaDeMalha({ fase, aoTerminar }: { fase: FaseDaCota; aoTerminar: () => void }) {
  const tela = useRef<HTMLCanvasElement>(null)
  const faseAtual = useRef(fase)
  faseAtual.current = fase

  const terminar = (evento: AnimationEvent<HTMLDivElement>) => {
    if (evento.animationName === "desveste") aoTerminar()
  }

  useEffect(() => {
    const canvas = tela.current
    if (!canvas) return
    const contexto = canvas.getContext("2d")
    if (!contexto) return

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let aneis: Anel[] = []
    let grade = new Map<string, Anel[]>()
    let quadro = 0
    let rodando = false
    let ultimo: { x: number; y: number } | null = null
    let largura = 0
    let altura = 0

    const desenhar = () => {
      contexto.clearRect(0, 0, largura, altura)
      contexto.lineWidth = 1.6
      contexto.strokeStyle = "#8fce63"
      contexto.globalAlpha = 0.58
      contexto.beginPath()
      for (const anel of aneis) {
        contexto.moveTo(anel.x + RAIO, anel.y)
        contexto.arc(anel.x, anel.y, RAIO, 0, Math.PI * 2)
      }
      contexto.stroke()

      contexto.globalAlpha = 0.9
      contexto.strokeStyle = "#d8e9a8"
      contexto.lineWidth = 1.2
      contexto.beginPath()
      for (const anel of aneis) {
        if (!anel.solto) continue
        contexto.moveTo(anel.x + RAIO, anel.y)
        contexto.arc(anel.x, anel.y, RAIO, 0, Math.PI * 2)
      }
      contexto.stroke()
      contexto.globalAlpha = 1
    }

    const medir = () => {
      const densidade = Math.min(window.devicePixelRatio || 1, 2)
      largura = window.innerWidth
      altura = window.innerHeight
      canvas.width = Math.round(largura * densidade)
      canvas.height = Math.round(altura * densidade)
      canvas.style.width = `${largura}px`
      canvas.style.height = `${altura}px`
      contexto.setTransform(densidade, 0, 0, densidade, 0, 0)
      const tecido = tecer(largura, altura)
      aneis = tecido.aneis
      grade = tecido.grade
      desenhar()
    }

    const integrar = () => {
      let acordados = 0
      for (const anel of aneis) {
        if (!anel.solto) continue
        anel.vx += (anel.origemX - anel.x) * 0.2
        anel.vy += (anel.origemY - anel.y) * 0.2
        anel.vx *= 0.74
        anel.vy *= 0.74
        anel.x += anel.vx
        anel.y += anel.vy

        const foraX = anel.x - anel.origemX
        const foraY = anel.y - anel.origemY
        const distancia = Math.hypot(foraX, foraY)
        if (distancia > DESLOCAMENTO_MAXIMO) {
          anel.x = anel.origemX + (foraX / distancia) * DESLOCAMENTO_MAXIMO
          anel.y = anel.origemY + (foraY / distancia) * DESLOCAMENTO_MAXIMO
        }

        if (distancia < 0.35 && Math.hypot(anel.vx, anel.vy) < 0.08) {
          anel.x = anel.origemX
          anel.y = anel.origemY
          anel.vx = 0
          anel.vy = 0
          anel.solto = false
        } else {
          acordados += 1
        }
      }
      desenhar()
      if (acordados > 0) quadro = requestAnimationFrame(integrar)
      else rodando = false
    }

    const pedir = () => {
      if (rodando) return
      rodando = true
      quadro = requestAnimationFrame(integrar)
    }

    const empurrar = (x: number, y: number, dirX: number, dirY: number, forca: number) => {
      const celulaX = Math.floor(x / PASSO_X)
      const celulaY = Math.floor(y / PASSO_Y)
      const alcanceX = Math.ceil(ALCANCE / PASSO_X)
      const alcanceY = Math.ceil(ALCANCE / PASSO_Y)
      const impulso = Math.min(forca, 16) * (reduzido ? 0.1 : 0.26)
      let atingiu = false

      for (let iy = celulaY - alcanceY; iy <= celulaY + alcanceY; iy += 1) {
        for (let ix = celulaX - alcanceX; ix <= celulaX + alcanceX; ix += 1) {
          const celula = grade.get(`${ix}:${iy}`)
          if (!celula) continue
          for (const anel of celula) {
            const distancia = Math.hypot(anel.origemX - x, anel.origemY - y)
            if (distancia > ALCANCE) continue
            const peso = (1 - distancia / ALCANCE) ** 2
            anel.vx += dirX * impulso * peso
            anel.vy += dirY * impulso * peso
            anel.solto = true
            atingiu = true
          }
        }
      }

      if (atingiu) tocarGolpe()
      pedir()
    }

    const descer = (evento: PointerEvent) => {
      if (faseAtual.current !== "vestindo") return
      prepararEspada()
      ultimo = { x: evento.clientX, y: evento.clientY }
      empurrar(evento.clientX, evento.clientY, 0.2, 0.98, 7)
    }

    const mover = (evento: PointerEvent) => {
      if (faseAtual.current !== "vestindo") return
      if (!ultimo) {
        ultimo = { x: evento.clientX, y: evento.clientY }
        return
      }
      const dx = evento.clientX - ultimo.x
      const dy = evento.clientY - ultimo.y
      const distancia = Math.hypot(dx, dy)
      ultimo = { x: evento.clientX, y: evento.clientY }
      if (distancia < 1.5) return
      empurrar(evento.clientX, evento.clientY, dx / distancia, dy / distancia, distancia)
    }

    const soltar = () => {
      ultimo = null
    }

    medir()
    window.addEventListener("pointerdown", descer)
    window.addEventListener("pointermove", mover)
    window.addEventListener("pointerup", soltar)
    window.addEventListener("pointercancel", soltar)
    window.addEventListener("resize", medir)

    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener("pointerdown", descer)
      window.removeEventListener("pointermove", mover)
      window.removeEventListener("pointerup", soltar)
      window.removeEventListener("pointercancel", soltar)
      window.removeEventListener("resize", medir)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("armada", fase === "vestindo")
    if (fase !== "vestindo") calarEspada()
    return () => {
      document.documentElement.classList.remove("armada")
      calarEspada()
    }
  }, [fase])

  return (
    <div className={`cota cota--${fase}`} onAnimationEnd={terminar} aria-hidden="true">
      <canvas ref={tela} className="cota__anel" />
    </div>
  )
}

import { useEffect, useState } from "react"
import { videos } from "../data/videos"

const consultaEstreita = "(max-width: 759px)"

function rotuloPosicao(inicio: number, visiveis: number, total: number) {
  const primeiro = inicio + 1
  const ultimo = Math.min(inicio + visiveis, total)
  if (primeiro === ultimo) return `${primeiro} de ${total}`
  return `${primeiro}–${ultimo} de ${total}`
}

export function Videos() {
  const [inicio, setInicio] = useState(0)
  const [visiveis, setVisiveis] = useState(3)
  const limite = Math.max(0, videos.length - visiveis)

  useEffect(() => {
    const consulta = window.matchMedia(consultaEstreita)
    const aplicar = () => {
      const quantidade = consulta.matches ? 1 : 3
      setVisiveis(quantidade)
      setInicio((atual) => Math.min(atual, Math.max(0, videos.length - quantidade)))
    }

    aplicar()
    consulta.addEventListener("change", aplicar)
    return () => consulta.removeEventListener("change", aplicar)
  }, [])

  const mover = (passo: number) => {
    setInicio((atual) => Math.min(limite, Math.max(0, atual + passo)))
  }

  return (
    <section className="secao" id="videos" aria-labelledby="titulo-videos">
      <h2 id="titulo-videos" className="secao__titulo">
        Codecon
      </h2>
      <p className="videos__intro">Participações no canal da Codecon, elaborando alguns projetos e desafios.</p>
      <div className="carrossel" aria-roledescription="carrossel">
        <div className="carrossel__controles">
          <button type="button" onClick={() => mover(-1)} disabled={inicio === 0}>
            Anterior
          </button>
          <p className="carrossel__posicao" aria-live="polite">
            {rotuloPosicao(inicio, visiveis, videos.length)}
          </p>
          <button type="button" onClick={() => mover(1)} disabled={inicio === limite}>
            Próximo
          </button>
        </div>
        <div className="carrossel__janela">
          <ol
            className="carrossel__trilho"
            style={{
              ["--indice" as string]: inicio,
              ["--total" as string]: videos.length,
              ["--visiveis" as string]: visiveis,
            }}
          >
            {videos.map((video, indice) => {
              const naJanela = indice >= inicio && indice < inicio + visiveis
              return (
                <li key={video.id} className="carrossel__card" aria-hidden={naJanela ? undefined : true}>
                  <a
                    className="carrossel__link"
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={naJanela ? undefined : -1}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                      alt=""
                      width={320}
                      height={180}
                    />
                    <span className="carrossel__titulo">{video.titulo}</span>
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

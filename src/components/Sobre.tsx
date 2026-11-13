const habilidades = [
  {
    nome: "Arquitetura",
    itens: "SOLID, Clean Architecture, DDD, Hexagonal",
  },
  {
    nome: "Backend",
    itens: "TypeScript, Node.js, NestJS, Express, Python, Go",
  },
  { nome: "Dados", itens: "PostgreSQL, SQL" },
  { nome: "Infraestrutura", itens: "Docker, Linux, NGINX" },
]

export function Sobre() {
  return (
    <section className="secao" id="sobre" aria-labelledby="titulo-sobre">
      <h2 id="titulo-sobre" className="secao__titulo">
        Sobre
      </h2>
      <div className="sobre">
        <div className="sobre__texto">
          <p>
            Desenho APIs e arquiteturas modulares para sistemas que precisam
            crescer sem carregar o monolito. O trabalho do dia a dia está em
            PostgreSQL, Linux e Docker.
          </p>
          <p>
            Tecnólogo em Análise e Desenvolvimento de Sistemas pela Unisociesc,
            concluído em dezembro de 2025. Na Alura, fiz as formações de
            backend com Node.js e de DevOps.
          </p>
          <p>Também ajudo na execução da Codecon Summit.</p>
        </div>
        <dl className="habilidades">
          {habilidades.map((grupo) => (
            <div key={grupo.nome}>
              <dt>{grupo.nome}</dt>
              <dd>{grupo.itens}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

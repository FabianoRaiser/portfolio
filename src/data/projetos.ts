export type LinkProjeto = {
  rotulo: string
  href: string
}

export type Projeto = {
  titulo: string
  ano: string
  descricao: string
  stack: string[]
  links: LinkProjeto[]
}

export const projetos: Projeto[] = [
  {
    titulo: "Curler",
    ano: "2026",
    descricao:
      "Cliente HTTP em Python sobre o curl do sistema, sem navegador headless. I/O, parsing e renderização ficam em módulos separados, com dataclasses imutáveis, REPL, histórico e sessão com headers e cookies. Testes, Ruff, CI e releases públicos, no molde de um projeto open source.",
    stack: ["Python", "Arquitetura modular", "GitHub Actions"],
    links: [
      { rotulo: "Código", href: "https://github.com/FabianoRaiser/curler-cli" },
      { rotulo: "Documentação", href: "https://fabianoraiser.github.io/curler-cli/" },
    ],
  },
]

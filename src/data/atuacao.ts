export type Atuacao = {
  cargo: string
  periodo: string
  contexto: string
  texto: string[]
}

export const atuacoes: Atuacao[] = [
  {
    cargo: "Desenvolvedor Pleno",
    periodo: "Ago 2026 — atual",
    contexto: "Excellent Sistemas · Remoto",
    texto: [
      "Migração do ERP/SaaS de um monolito em PHP para microserviços orientados a eventos, com NestJS, Go e Angular. As integrações de crédito, BrasilCredit e RedeCredAuto, usam DDD e arquitetura hexagonal.",
      "No produto: pipeline de franqueados, assinaturas, onboarding, catálogo de consultas e RBAC. A adoção de Spec-Driven Development, com o time de produto, acelerou as entregas em 70%.",
    ],
  },
  {
    cargo: "Desenvolvedor Júnior",
    periodo: "Fev 2025 — Jul 2026",
    contexto: "Inlog Soluções · Joinville",
    texto: [
      "APIs REST em Python, Node.js, TypeScript e PostgreSQL, com SOLID e Clean Architecture. No SOC, integrei Wazuh e Zabbix à DFIR-IRIS por API e mensageria.",
      "Também automatizei avaliações de compliance e mantive Linux e Docker entre homologação e produção.",
    ],
  },
  {
    cargo: "Estagiário",
    periodo: "Jun 2024 — Fev 2025",
    contexto: "Secretaria da Educação de Joinville",
    texto: [
      "Fluxos de coleta, tratamento e correlação para 60 escolas e 6 mil alunos. O tempo de processamento manual caiu em até 80%. Os indicadores do programa de alfabetização foram para dashboards no Looker Studio.",
    ],
  },
]

import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MuralCreateArgs>({
  mural: {
    one: { data: { titulo: 'String', descricao: 'String', imagem: 'String' } },
    two: { data: { titulo: 'String', descricao: 'String', imagem: 'String' } },
  },
})

export type StandardScenario = typeof standard

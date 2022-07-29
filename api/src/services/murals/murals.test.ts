import { murals, mural, createMural, updateMural, deleteMural } from './murals'
import type { StandardScenario } from './murals.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('murals', () => {
  scenario('returns all murals', async (scenario: StandardScenario) => {
    const result = await murals()

    expect(result.length).toEqual(Object.keys(scenario.mural).length)
  })

  scenario('returns a single mural', async (scenario: StandardScenario) => {
    const result = await mural({ id: scenario.mural.one.id })

    expect(result).toEqual(scenario.mural.one)
  })

  scenario('creates a mural', async () => {
    const result = await createMural({
      input: { titulo: 'String', descricao: 'String', imagem: 'String' },
    })

    expect(result.titulo).toEqual('String')
    expect(result.descricao).toEqual('String')
    expect(result.imagem).toEqual('String')
  })

  scenario('updates a mural', async (scenario: StandardScenario) => {
    const original = await mural({ id: scenario.mural.one.id })
    const result = await updateMural({
      id: original.id,
      input: { titulo: 'String2' },
    })

    expect(result.titulo).toEqual('String2')
  })

  scenario('deletes a mural', async (scenario: StandardScenario) => {
    const original = await deleteMural({ id: scenario.mural.one.id })
    const result = await mural({ id: original.id })

    expect(result).toEqual(null)
  })
})

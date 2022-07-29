import type { FindMuralById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Mural from 'src/components/Mural/Mural'

export const QUERY = gql`
  query FindMuralById($id: Int!) {
    mural: mural(id: $id) {
      id
      titulo
      descricao
      imagem
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Mural not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ mural }: CellSuccessProps<FindMuralById>) => {
  return <Mural mural={mural} />
}

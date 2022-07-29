import type { FindMurals } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Murals from 'src/components/Mural/Murals'

export const QUERY = gql`
  query FindMurals {
    murals {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No murals yet. '}
      <Link to={routes.newMural()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ murals }: CellSuccessProps<FindMurals>) => {
  return <Murals murals={murals} />
}

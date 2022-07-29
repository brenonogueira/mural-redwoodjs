import type { EditMuralById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MuralForm from 'src/components/Mural/MuralForm'

export const QUERY = gql`
  query EditMuralById($id: Int!) {
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
const UPDATE_MURAL_MUTATION = gql`
  mutation UpdateMuralMutation($id: Int!, $input: UpdateMuralInput!) {
    updateMural(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ mural }: CellSuccessProps<EditMuralById>) => {
  const [updateMural, { loading, error }] = useMutation(UPDATE_MURAL_MUTATION, {
    onCompleted: () => {
      toast.success('Mural updated')
      navigate(routes.murals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), })
    updateMural({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Mural {mural.id}</h2>
      </header>
      <div className="rw-segment-main">
        <MuralForm mural={mural} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}

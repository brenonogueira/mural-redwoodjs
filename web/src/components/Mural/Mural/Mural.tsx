import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_MURAL_MUTATION = gql`
  mutation DeleteMuralMutation($id: Int!) {
    deleteMural(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Mural = ({ mural }) => {
  const [deleteMural] = useMutation(DELETE_MURAL_MUTATION, {
    onCompleted: () => {
      toast.success('Mural deleted')
      navigate(routes.murals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete mural ' + id + '?')) {
      deleteMural({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Mural {mural.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{mural.id}</td>
            </tr><tr>
              <th>Titulo</th>
              <td>{mural.titulo}</td>
            </tr><tr>
              <th>Descricao</th>
              <td>{mural.descricao}</td>
            </tr><tr>
              <th>Imagem</th>
              <td>{mural.imagem}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(mural.createdAt)}</td>
            </tr><tr>
              <th>User id</th>
              <td>{mural.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMural({ id: mural.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(mural.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Mural

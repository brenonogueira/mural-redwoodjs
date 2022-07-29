import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Mural/MuralsCell'

const DELETE_MURAL_MUTATION = gql`
  mutation DeleteMuralMutation($id: Int!) {
    deleteMural(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const MuralsList = ({ murals }) => {
  const [deleteMural] = useMutation(DELETE_MURAL_MUTATION, {
    onCompleted: () => {
      toast.success('Mural deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete mural ' + id + '?')) {
      deleteMural({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Descricao</th>
            <th>Imagem</th>
            <th>Created at</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {murals.map((mural) => (
            <tr key={mural.id}>
              <td>{truncate(mural.id)}</td>
              <td>{truncate(mural.titulo)}</td>
              <td>{truncate(mural.descricao)}</td>
              <td>{truncate(mural.imagem)}</td>
              <td>{timeTag(mural.createdAt)}</td>
              <td>{truncate(mural.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.mural({ id: mural.id })}
                    title={'Show mural ' + mural.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMural({ id: mural.id })}
                    title={'Edit mural ' + mural.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete mural ' + mural.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(mural.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MuralsList

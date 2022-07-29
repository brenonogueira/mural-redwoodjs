import { Card, CardContent, Container, Paper, Typography } from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MuralForm from 'src/components/Mural/MuralForm'

const CREATE_MURAL_MUTATION = gql`
  mutation CreateMuralMutation($input: CreateMuralInput!) {
    createMural(input: $input) {
      id
    }
  }
`

const NewMural = () => {
  const [createMural, { loading, error }] = useMutation(CREATE_MURAL_MUTATION, {
    onCompleted: () => {
      toast.success('Recado criado!')
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
    createMural({ variables: { input: castInput } })
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Novo recado
          </Typography>

          <MuralForm onSave={onSave} loading={loading} error={error} />
        </CardContent>
      </Card>
    </Container>
  )
}

export default NewMural

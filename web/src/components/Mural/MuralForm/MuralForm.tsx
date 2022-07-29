import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { Container } from '@mui/system'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  // NumberField,
  Submit,
} from '@redwoodjs/forms'

const MuralForm = (props) => {
  const [userId, setUserId] = useState()
  const auth = useAuth()

  async function getUser() {
    await auth.getCurrentUser().then((data: any) => {
      setUserId(data.id)
    })
  }

  useEffect(() => {
    getUser()
    return () => {}
  }, [])

  useEffect(() => {
    console.log(userId)
  }, [userId])

  const onSubmit = (data) => {
    console.log(data)
    Object.assign(data, { userId })
    props.onSave(data, props?.mural?.id)
  }

  return (
    <Container className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="titulo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Titulo
        </Label>

        <TextField
          name="titulo"
          defaultValue={props.mural?.titulo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="titulo" className="rw-field-error" />

        <Label
          name="descricao"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Descricao
        </Label>

        <TextAreaField
          name="descricao"
          defaultValue={props.mural?.descricao}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          rows={4}
          validation={{ required: true }}
        />

        <FieldError name="descricao" className="rw-field-error" />

        <Label
          name="imagem"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Imagem
        </Label>

        <TextField
          name="imagem"
          defaultValue={props.mural?.imagem}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: false }}
        />

        <FieldError name="imagem" className="rw-field-error" />

        <Grid
          container
          direction="row"
          justifyContent="end"
          alignItems="center"
          style={{ padding: 10 }}
        >
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </Grid>
      </Form>
    </Container>
  )
}

export default MuralForm

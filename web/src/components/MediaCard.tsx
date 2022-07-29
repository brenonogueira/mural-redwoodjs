import * as React from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export interface Root {
  data: Data
}

export interface Data {
  __typename: string
  id: number
  titulo: string
  descricao: string
  imagem: string
  createdAt: string
  userId: number
}
export default function MediaCard({ data }: Root) {
  React.useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" height="300" image={data?.imagem} alt="card" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.descricao}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Compartilhar</Button>
        <Button size="small">Leia mais</Button>
      </CardActions> */}
    </Card>
  )
}

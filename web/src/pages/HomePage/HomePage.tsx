import { useEffect } from 'react'

import { Grid } from '@mui/material'
import type { FindMurals } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

import MediaCard from 'src/components/MediaCard'

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

const HomePage = () => {
  const query = useQuery(QUERY)

  useEffect(() => {
    console.log(query.data)
  }, [query])

  return query.data ? (
    <Grid
      container
      spacing={2}
      columns={{ xs: 4, sm: 3, md: 12 }}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {query.data?.murals.map((item) => (
        <Grid item xs={3} key={item.id}>
          <MediaCard data={item} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <></>
  )
}

export default HomePage

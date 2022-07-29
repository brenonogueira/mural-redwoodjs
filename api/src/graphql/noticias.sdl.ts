export const schema = gql`
  type Noticia {
    id: Int!
    titulo: String!
    descricao: String!
    createdAt: DateTime!
  }

  type Query {
    noticias: [Noticia!]! @requireAuth
    noticia(id: Int!): Noticia @requireAuth
  }

  input CreateNoticiaInput {
    titulo: String!
    descricao: String!
  }

  input UpdateNoticiaInput {
    titulo: String
    descricao: String
  }

  type Mutation {
    createNoticia(input: CreateNoticiaInput!): Noticia! @requireAuth
    updateNoticia(id: Int!, input: UpdateNoticiaInput!): Noticia! @requireAuth
    deleteNoticia(id: Int!): Noticia! @requireAuth
  }
`

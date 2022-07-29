export const schema = gql`
  type Mural {
    id: Int!
    titulo: String!
    descricao: String!
    imagem: String!
    createdAt: DateTime!
    user: User
    userId: Int
  }

  type Query {
    # murals: [Mural!]! @requireAuth
    murals: [Mural!]! @skipAuth
    mural(id: Int!): Mural @requireAuth
  }

  input CreateMuralInput {
    titulo: String!
    descricao: String!
    imagem: String!
    userId: Int
  }

  input UpdateMuralInput {
    titulo: String
    descricao: String
    imagem: String
    userId: Int
  }

  type Mutation {
    createMural(input: CreateMuralInput!): Mural! @requireAuth
    updateMural(id: Int!, input: UpdateMuralInput!): Mural! @requireAuth
    deleteMural(id: Int!): Mural! @requireAuth
  }
`

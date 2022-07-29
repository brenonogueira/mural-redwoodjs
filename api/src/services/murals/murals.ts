import type {
  QueryResolvers,
  MutationResolvers,
  MuralResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const murals: QueryResolvers['murals'] = () => {
  return db.mural.findMany()
}

export const mural: QueryResolvers['mural'] = ({ id }) => {
  return db.mural.findUnique({
    where: { id },
  })
}

export const createMural: MutationResolvers['createMural'] = ({ input }) => {
  return db.mural.create({
    data: input,
  })
}

export const updateMural: MutationResolvers['updateMural'] = ({
  id,
  input,
}) => {
  return db.mural.update({
    data: input,
    where: { id },
  })
}

export const deleteMural: MutationResolvers['deleteMural'] = ({ id }) => {
  return db.mural.delete({
    where: { id },
  })
}

export const Mural: MuralResolvers = {
  user: (_obj, { root }) =>
    db.mural.findUnique({ where: { id: root.id } }).user(),
}

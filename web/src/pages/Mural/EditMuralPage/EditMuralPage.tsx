import EditMuralCell from 'src/components/Mural/EditMuralCell'

type MuralPageProps = {
  id: number
}

const EditMuralPage = ({ id }: MuralPageProps) => {
  return <EditMuralCell id={id} />
}

export default EditMuralPage

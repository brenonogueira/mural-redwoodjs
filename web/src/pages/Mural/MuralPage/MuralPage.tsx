import MuralCell from 'src/components/Mural/MuralCell'

type MuralPageProps = {
  id: number
}

const MuralPage = ({ id }: MuralPageProps) => {
  return <MuralCell id={id} />
}

export default MuralPage

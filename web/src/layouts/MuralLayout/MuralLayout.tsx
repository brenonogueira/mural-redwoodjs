import { Container } from '@mui/system'

import { Toaster } from '@redwoodjs/web/dist/toast'

import ResponsiveAppBar from 'src/components/ResponsiveNavbar'

type MuralLayoutProps = {
  children?: React.ReactNode
}

const MuralLayout = ({ children }: MuralLayoutProps) => {
  return (
    <>
      <ResponsiveAppBar />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Container maxWidth="xl" style={{ padding: 10 }}>
        {children}
      </Container>
    </>
  )
}

export default MuralLayout

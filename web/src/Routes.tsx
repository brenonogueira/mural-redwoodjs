// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Router, Route, Set } from '@redwoodjs/router'

import MuralsLayout from 'src/layouts/MuralsLayout'

import MuralLayout from './layouts/MuralLayout/MuralLayout'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = () => {
  return (
    <Router>
      {/* <Set wrap={MuralsLayout}></Set> */}
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={MuralLayout}>
        <Private unauthenticated="login">
          <Route path="/" page={HomePage} name="home" />
          <Route path="/murals/new" page={MuralNewMuralPage} name="newMural" />
          <Route path="/murals/{id:Int}/edit" page={MuralEditMuralPage} name="editMural" />
          <Route path="/murals/{id:Int}" page={MuralMuralPage} name="mural" />
          <Route path="/murals" page={MuralMuralsPage} name="murals" />
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

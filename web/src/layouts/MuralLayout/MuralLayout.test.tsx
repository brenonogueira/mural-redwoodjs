import { render } from '@redwoodjs/testing/web'

import MuralLayout from './MuralLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MuralLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MuralLayout />)
    }).not.toThrow()
  })
})

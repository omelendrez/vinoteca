import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('Renders botón Log in', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/La Caba/i)
  expect(linkElement).toBeInTheDocument()
})

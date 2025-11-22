import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('redirige a la página de login por defecto', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument()
  })
})

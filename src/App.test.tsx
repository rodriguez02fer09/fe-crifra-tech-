import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('muestra el nombre de la aplicación en el header', () => {
    render(<App />)

    expect(screen.getByText(/CIFRA/i)).toBeInTheDocument()
  })

  it('muestra el texto de copyright en el footer', () => {
    render(<App />)

    expect(
      screen.getByText(/Todos los derechos reservados/i)
    ).toBeInTheDocument()
  })
})

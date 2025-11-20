import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { useCounterStore } from './store/counterStore'

beforeEach(() => {
  useCounterStore.getState().reset()
})

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('renders the count button', () => {
    render(<App />)
    expect(
      screen.getByRole('button', { name: /count is/i })
    ).toBeInTheDocument()
  })

  it('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is/i })
    expect(button).toHaveTextContent('count is 0')

    await user.click(button)
    expect(button).toHaveTextContent('count is 1')

    await user.click(button)
    expect(button).toHaveTextContent('count is 2')
  })

  it('renders the Vite logo', () => {
    render(<App />)
    const viteLogo = screen.getByAltText('Vite logo')
    expect(viteLogo).toBeInTheDocument()
  })

  it('renders the React logo', () => {
    render(<App />)
    const reactLogo = screen.getByAltText('React logo')
    expect(reactLogo).toBeInTheDocument()
  })
})

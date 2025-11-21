import './App.css'
import { Layout } from './components/layout/layout'
function App({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  )
}

export default App

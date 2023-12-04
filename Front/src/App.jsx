import { RoutesMain } from './routes/RoutesMain'
import { GlobalStyles } from './styles/global'
import { GlobalReset } from './styles/reset'
import { UserContext } from './providers/UserContext'
import { useContext } from 'react'

function App() {
  const { loading } = useContext(UserContext)

  return (
    <div className='App'>
      <GlobalReset />
      <GlobalStyles />

      {loading ? <p>Carregando...</p> : <RoutesMain />}  

    </div>
  )
}

export default App
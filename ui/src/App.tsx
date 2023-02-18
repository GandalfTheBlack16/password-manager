import './App.css'
import Main from './components/Main';
import { AuthProvider } from './contexts/authContext';

function App() {  
  return (
    <AuthProvider>
      <div className="App">
        <Main />
      </div>
    </AuthProvider>
  )
}

export default App

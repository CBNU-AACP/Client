import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QrGenerator from './components/QrGenerator'
import QrScanner from './components/QrScanner'
import Login from './components/Login'
import RegisterForm from './components/Register'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={RegisterForm} />
        <Route exact path="/QrGen" component={QrGenerator} />
        <Route exact path="/QrScan" component={QrScanner} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

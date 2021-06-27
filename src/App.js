import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QrGenerator from './components/QrGenerator'
import QrScanner from './components/QrScanner'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/QrGen" component={QrGenerator} />
        <Route exact path="/QrScan" component={QrScanner} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

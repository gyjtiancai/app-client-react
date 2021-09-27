import './App.less';
import Header from "./components/Header/index.jsx"
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history'
import Routes from './router';
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router history={createHashHistory()}>
        <div className="app">
          <Header appName="React App"></Header>
          <div className="app-container">
            <Routes></Routes>
          </div>
        </div>
      </Router>
    </Provider>)
}

export default App;

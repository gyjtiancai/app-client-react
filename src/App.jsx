import './App.less';
import Header from "./components/Header/index.jsx"
import Sidebar from "./components/Sidebar/index.jsx"
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history'
import Routes from './router';
import { Provider } from 'react-redux'
import store from './store'
import { message } from 'antd';
import { AuthorizeSDK, GetAppUserInfo } from './request/api'
let isRender = true
async function authorizeApp() {
  const searchParams = new URLSearchParams(window.location.search);
  if (
    [
      searchParams.has("memberId"),
      searchParams.has("organizationId"),
    ].includes(false)
  ) {
    message.error("缺少授权信息");
    isRender = false
    return;
  }
  let authorizeSDKRequest = {
    mbGuid: searchParams.get("memberId"),
    orgGuid: searchParams.get("organizationId"),
    appType: 21,
  };
  const res = await AuthorizeSDK(authorizeSDKRequest)
  console.log(res)
  window.sessionStorage.setItem('appToken', JSON.stringify(res))
  message.success('授权成功')
  const user = await GetAppUserInfo()
  console.log(user)
  store.dispatch({
    type: 'setUserInfo',
    data: user
  })
}
// authorizeApp()
console.log(isRender)
function App() {
  return (
    isRender ? <Provider store={store}>
      <Router history={createHashHistory()}>
        <div className="app">
          <Header appName="React App"></Header>
          <div className="app-container">
            <Sidebar></Sidebar>
            <Routes></Routes>
          </div>
        </div>
      </Router>
    </Provider> : null)
}

export default App;

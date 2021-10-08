import { Route } from 'react-router-dom';
import Welcome from "@/views/welcome/index.jsx"
import Home from "@/views/home/index.jsx"
import PageTwo from "@/views/two/index.jsx"
const routes = [
    { path: '/', component: Welcome },
    { path: '/home', component: Home },
    { path: '/two', component: PageTwo },
];
const route = () => {
    return routes.map((route) => <Route exact key={route.path} path={route.path} component={route.component} />)
}
export default route

import { Route } from 'react-router-dom';
import Home from "@/views/home/index.jsx"
import PageTwo from "@/views/two/index.jsx"
const routes = [
    { path: '/home', component: Home },
    { path: '/two', component: PageTwo },
];
const route = () => {
    return routes.map((route) => <Route key={route.path} path={route.path} component={route.component} />)
}
export default route

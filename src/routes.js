import {
    AppFrame,
    Home,
    WhiteListDomain
} from './components';

const routes = [
    {
        component: AppFrame,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/whitelist',
                exact: true,
                component: WhiteListDomain
            }
        ]
    }
]

export default routes;
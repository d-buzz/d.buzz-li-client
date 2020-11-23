import {
    AppFrame,
    Home,
    WhiteListDomain,
    RedirectLongUrl
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
                path: '/:keyword',
                exact: true,
                component: RedirectLongUrl
            },
            {
                path: '/ug/whitelist',
                exact: true,
                component: WhiteListDomain
            },
            {
                path: '/admin/whitelist',
                exact: true,
                component: WhiteListDomain
            }
        ]
    }
]

export default routes;
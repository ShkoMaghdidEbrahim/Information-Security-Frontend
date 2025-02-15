import {lazy} from 'react';
import {BulbTwoTone, CalendarTwoTone, FundOutlined} from "@ant-design/icons";

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const CaesarCipher = lazy(() => import('./pages/CaesarCipher.jsx'));
const MonoAlphabeticCipher = lazy(() => import('./pages/MonoAlphabeticCipher.jsx'));
const routes = [
    {
        key: 1,
        path: '/',
        label: 'Dashboard',
        component: Dashboard,
        icon: <FundOutlined
            style = {{
                fontSize: 20
            }}
        />,
        dontShowInMenu: true,
    },
    {
        key: 2,
        path: 'WeekOne',
        label: 'WeekOne',
        icon: <CalendarTwoTone
            style = {{
                fontSize: 20,
                margin: 0
            }}
        />,
        children: [
            {
                key: '2.1.1',
                path: 'CaesarCipher',
                label: 'Caesar Cipher',
                component: CaesarCipher,
            },
            {
                key: '2.2.1',
                path: 'MonoAlphabeticCipher',
                label: 'Mono Alphabetic Cipher',
                component: MonoAlphabeticCipher,
            }
        ],
    },
];
export default routes;

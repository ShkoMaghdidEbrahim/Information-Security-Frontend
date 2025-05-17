import {lazy} from 'react';
import {CalendarTwoTone, FundOutlined} from "@ant-design/icons";

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const CaesarCipher = lazy(() => import('./pages/WeekOne/CaesarCipher.jsx'));
const MonoAlphabeticCipher = lazy(() => import('./pages/WeekOne/MonoAlphabeticCipher.jsx'));

const DES = lazy(() => import('./pages/WeekTwo/DES.jsx'));

const SHA512 = lazy(() => import('./pages/Final/SHA512.jsx'));

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
    {
        key: 3,
        path: 'WeekTwo',
        label: 'WeekTwo',
        icon: <CalendarTwoTone
            style = {{
                fontSize: 20,
                margin: 0
            }}
        />,
        children: [
            {
                key: '2.1.1',
                path: 'DESAlgorithm',
                label: 'DES Encryption/Decryption',
                component: DES,
            },
        ],
    },
    {
        key: 4,
        path: 'Final',
        label: 'Final',
        icon: <CalendarTwoTone
            style = {{
                fontSize: 20,
                margin: 0
            }}
        />,
        children: [
            {
                key: '3.1.1',
                path: 'SHA512',
                label: 'SHA512 Hashing',
                component: SHA512,
            },
        ],
    },
];
export default routes;

import {Button, Col, ConfigProvider, Layout, Menu, Row, theme, Typography} from 'antd';
import './assets/styles/global.scss';
import {Route, Routes, useNavigate, useLocation, Outlet} from 'react-router-dom';
import {Suspense, useState} from 'react';
import routesConfig from './routes.jsx';
import {LeftOutlined, LoadingOutlined, RightOutlined, SettingFilled} from '@ant-design/icons';
import useLocalStorage from './configs/useLocalStorage.js';
import SettingsDrawer from './components/App/SettingsDrawer.jsx';

const colors = [
    '#E4343E',
    '#CB8B1E',
    '#52C41A',
    '#B37FEB',
    '#1890FF',
    '#E434B2',
    '#28A745',
    '#FFC107',
    '#17A2B8',
    '#6610F2',
    '#FFFFFF',
    '#000000',
];

const {
    Sider,
    Header,
    Content
} = Layout;

function getFullPath(parentPath, routePath) {
    let base = parentPath || '';
    if (!base.endsWith('/')) {
        base += '/';
    }
    if (routePath.startsWith('/')) {
        routePath = routePath.slice(1);
    }
    let fullPath = base + routePath;
    
    if (fullPath !== '/' && fullPath.endsWith('/')) {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
}

function flattenRoutes(routes, parentPath = '') {
    let flat = [];
    routes.forEach((route) => {
        const fullPath = getFullPath(parentPath, route.path);
        if (route.component) {
            flat.push({
                ...route,
                fullPath
            });
        }
        if (route.children) {
            flat = flat.concat(flattenRoutes(route.children, fullPath));
        }
    });
    return flat;
}

function generateMenuItems(routes, parentPath = '', navigate) {
    return routes.map((route) => {
        const fullPath = getFullPath(parentPath, route.path);
        if (route.dontShowInMenu) {
            return null;
        }
        if (route.children) {
            if (route.type) {
                return {
                    key: fullPath,
                    icon: route.icon,
                    label: route.label,
                    type: route.type,
                    children: generateMenuItems(route.children, fullPath, navigate),
                };
            } else {
                return {
                    key: fullPath,
                    icon: route.icon,
                    label: route.label,
                    children: generateMenuItems(route.children, fullPath, navigate),
                };
            }
        }
        return {
            key: fullPath,
            icon: route.icon,
            label: route.label,
            onClick: () => {
                navigate(fullPath);
            },
        };
    });
}

function generateRoutes(routes, parentPath = '') {
    return routes.map((route) => {
        const fullPath = getFullPath(parentPath, route.path);
        if (route.children) {
            if (route.component) {
                const Component = route.component;
                return (
                    <Route
                        key = {fullPath}
                        path = {route.path}
                        element = {
                            <Suspense fallback = {<LoadingFallback/>}>
                                <Component/>
                            </Suspense>
                        }
                    >
                        {generateRoutes(route.children, fullPath)}
                    </Route>
                );
            } else {
                return (
                    <Route key = {fullPath} path = {route.path} element = {<Outlet/>}>
                        {generateRoutes(route.children, fullPath)}
                    </Route>
                );
            }
        }
        const Component = route.component;
        return (
            <Route
                key = {fullPath}
                path = {route.path}
                element = {
                    <Suspense fallback = {<LoadingFallback/>}>
                        <Component/>
                    </Suspense>
                }
            />
        );
    });
}

function LoadingFallback() {
    return (
        <div
            style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
            }}
        >
            <div
                style = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 40,
                }}
            >
                <LoadingOutlined
                    style = {{
                        fontSize: 100,
                        display: 'block',
                        margin: 'auto',
                    }}
                />
                <p
                    style = {{
                        fontSize: 25,
                        fontWeight: 'bold',
                    }}
                >
                    Loading...
                </p>
            </div>
        </div>
    );
}

function App() {
    const {
        token: {
            borderRadiusLG,
            borderRadiusSM
        },
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);
    const [colorLocalStorage] = useLocalStorage('darkMode', null);
    const [isDarkMode, setDarkMode] = useState(colorLocalStorage?.darkMode);
    const [color, setColor] = useState(colorLocalStorage?.color ? colorLocalStorage.color : colors[0]);
    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
    
    const flatRoutes = flattenRoutes(routesConfig);
    const selectedRoute = flatRoutes.find((route) => route.fullPath === location.pathname);
    const selectedKey = selectedRoute ? selectedRoute.fullPath : '';
    
    const menuItems = generateMenuItems(routesConfig, '', navigate);
    const headerTitle = selectedRoute ? selectedRoute.label : '';
    
    return (
        <ConfigProvider
            theme = {{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: color,
                    Layout: {
                        siderBg: isDarkMode ? '#141414' : '#FFFFFF',
                        headerBg: isDarkMode ? '#141414' : '#FFFFFF',
                        triggerColor: color,
                    },
                    Menu: {
                        subMenuItemBg: isDarkMode ? '#141414' : '#FFFFFF',
                    },
                    Card: {padding: 10},
                    Popconfirm: {fontSize: 15},
                    Drawer: {colorBgElevated: isDarkMode ? '#141414' : '#FFFFFF'},
                },
            }}
        >
            <Layout className = {'layoutStyle'} hasSider = {true}>
                <Sider
                    collapsed = {collapsed}
                    trigger = {null}
                    onCollapse = {setCollapsed}
                    width = {300}
                    style = {{
                        outline: isDarkMode ? '1px solid #414141' : '1px solid #d3d3d3',
                    }}
                >
                    <div
                        style = {{
                            height: '5%',
                            background: color,
                            margin: 5,
                            borderRadius: borderRadiusSM,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography.Title
                            level = {3}
                            style = {{
                                color: 'white',
                                margin: 0,
                                textAlign: 'center',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                transition: 'width 0.4s ease',
                                width: collapsed ? '30px' : '200px',
                            }}
                        >
                            <div style = {{
                                display: 'inline-block',
                                width: '100%',
                                textAlign: 'center'
                            }}>
                                {collapsed ? 'CS' : 'Computer Security'}
                            </div>
                        </Typography.Title>
                    </div>
                    <Menu
                        inlineCollapsed = {collapsed}
                        mode = "inline"
                        style = {{
                            paddingTop: 15,
                            fontSize: 15,
                            height: '85%',
                            borderRadius: '0',
                            border: 'none',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                        }}
                        selectedKeys = {[selectedKey]}
                        items = {menuItems}
                    />
                    <Button
                        type = "primary"
                        icon = {
                            collapsed ? (
                                <RightOutlined style = {{fontSize: 30}}/>
                            ) : (
                                <LeftOutlined style = {{fontSize: 30}}/>
                            )
                        }
                        onClick = {() => setCollapsed(!collapsed)}
                        style = {{
                            borderRadius: '0',
                            width: '100%',
                            height: '10%',
                            display: 'block',
                        }}
                    />
                </Sider>
                
                <Layout style = {{
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}>
                    <Header style = {{
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: 25
                    }}>
                        <Row
                            style = {{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography.Title level = {3} style = {{
                                color: color,
                                margin: 0
                            }}>
                                {headerTitle}
                            </Typography.Title>
                            <Col style = {{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }} span = {12}>
                                <Button
                                    style = {{alignItems: 'center'}}
                                    onClick = {() => setSettingsDrawerOpen(true)}
                                    type = "secondary"
                                >
                                    <SettingFilled style = {{
                                        fontSize: 30,
                                        color: color
                                    }}/>
                                </Button>
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style = {{
                            color: 'white',
                            margin: '8px 8px',
                            padding: 0,
                            height: '100%',
                            background: isDarkMode ? '#141414' : '#FFFFFF',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>{generateRoutes(routesConfig)}</Routes>
                    </Content>
                </Layout>
                
                <SettingsDrawer
                    open = {settingsDrawerOpen}
                    onClose = {() => setSettingsDrawerOpen(false)}
                    isDarkMode = {isDarkMode}
                    setDarkMode = {setDarkMode}
                    setColor = {setColor}
                />
            </Layout>
        </ConfigProvider>
    );
}

export default App;

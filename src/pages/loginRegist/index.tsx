import React, { memo, lazy, Suspense } from 'react'
import { Tabs } from 'antd';
import Login from '../../components/login/index'
import Register from '../../components/Register/index'
import './index.styl'

import appState from '../../store/app-state'

const WebSocket = lazy(() => import(/* webpackChunkName: 'websocket' */'../../components/WebSocket'))

interface Props {
    history: {
        goBack(): void
    },
    [other: string]: object | string | number
}

const { TabPane } = Tabs;
const LoginRegister = memo((props: Props) => {
    if (localStorage.getItem('token') && appState.isLogin) {
        const { history } = props
        history.goBack()
    }
    return (
        <>  
            <Suspense fallback={<div />}>
                <WebSocket />
            </Suspense>
            <div className='login-from'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Login" key="1" >
                        <Login {...props} />
                    </TabPane>
                    <TabPane tab="Register" key="2" >
                        <Register {...props} />
                    </TabPane>
                </Tabs>
            </div>
        </>
        
        
    )
    
})

export default LoginRegister

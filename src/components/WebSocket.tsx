import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { notification } from 'antd';
import { BASE_URL } from '../utils/request.js'
declare type IconType = 'success' | 'info' | 'error' | 'warning';

const openNotificationWithIcon = (type: IconType, msg: string) => {
  notification[type]({
    message: msg,
    duration: null
  });
};

const SOCKET_URL_ONE = `wss://${BASE_URL}/webSocket`
const STATIC_OPTIONS = {
  share: true,
  shouldReconnect: () => false,
};

const WebSocket = ({}) => {
  const [sendMessage, lastMessage] = useWebSocket(SOCKET_URL_ONE, STATIC_OPTIONS);



  useEffect(() => {
      if (lastMessage) {
        try {
          const msg = JSON.parse(lastMessage.data) || ''
          if (typeof msg.data === 'object') {
            msg.data = JSON.stringify(msg.data)
          }
          if (msg.status) {
            openNotificationWithIcon('success', msg.data)
          } else {
            openNotificationWithIcon('error', msg.data)
          }
        } catch (e) {
          openNotificationWithIcon('error', e.toString())
        }
          
      }
  }, [lastMessage])

  return (
    <div>
    </div>
  );
};


export default WebSocket
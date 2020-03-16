import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { notification } from 'antd';
declare type IconType = 'success' | 'info' | 'error' | 'warning';

const openNotificationWithIcon = (type: IconType, msg: string) => {
  notification[type]({
    message: msg,
    duration: null
  });
};

const SOCKET_URL_ONE = `ws://localhost:8090/webSocket`
const STATIC_OPTIONS = {
  share: true,
  shouldReconnect: () => false,
};

const WebSocket = ({}) => {
  const [sendMessage, lastMessage] = useWebSocket(SOCKET_URL_ONE, STATIC_OPTIONS);



  useEffect(() => {
      if (lastMessage) {
          const msg = JSON.parse(lastMessage.data) || ''
          if (msg.status) {
            openNotificationWithIcon('success', msg.data)
          } else {
            openNotificationWithIcon('error', msg.data)
          }
      }
  }, [lastMessage])

  return (
    <div>
    </div>
  );
};


export default WebSocket
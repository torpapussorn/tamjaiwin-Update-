import { useEffect, useState } from 'react';

const endpoint = '';

const $ = {
  get ws() {
    return (window as any)['ws'];
  },
  set ws(webSocket: WebSocket) {
    (window as any)['ws'] = webSocket;
  },
};

export const useWebSocket = <K extends keyof WebSocketEventMap>(
  ev?: K,
  cb?: (this: WebSocket, ev: WebSocketEventMap[K]) => any
) => {
  const [ws, setWebSocket] = useState<WebSocket>();
  const [msg, setMessage] = useState<any>();

  useEffect(() => {
    const connect = () => {
      if (!$.ws) {
        $.ws = new WebSocket(endpoint);
        setWebSocket($.ws);
      } else {
        setWebSocket($.ws);
      }

      $.ws.addEventListener('message', function (ev) {
        setMessage(ev.data);
      });

      $.ws.addEventListener('error', function (_ev) {
        $.ws.close();
      });

      $.ws.addEventListener('close', function (_ev) {
        connect();
      });
    };

    connect();

    return () => {};
  }, []);

  useEffect(() => {
    if (!ws || !ev || !cb) return;

    ws.addEventListener(ev, cb);
  }, [ws, ev, cb]);

  return { ws, message: msg };
};

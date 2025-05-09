// ✅ 2. OnlineUsers.js
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function OnlineUsers({ onSelectUser }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws');
    const client = new Client({ webSocketFactory: () => socket });

    client.onConnect = () => {
      client.subscribe('/topic/online-users', (msg) => {
        const users = JSON.parse(msg.body);
        setOnlineUsers(users);
      });
    };

    client.activate();
    return () => client.deactivate();
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 10, left: 10, background: '#eee', padding: 10, borderRadius: 5 }}>
      <h4>접속자</h4>
      {onlineUsers.map((user) => (
        <div key={user.id} onClick={() => onSelectUser(user)}>
          {user.username}
        </div>
      ))}
    </div>
  );
}

export default OnlineUsers;

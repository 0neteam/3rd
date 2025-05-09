import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import DMModal from '../components/DMModal';
import { setupWebSocket, disconnectWebSocket } from '../services/socket';

function DMListPage() {
  const { user } = useAuth();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    setupWebSocket(user.id, (newMessage) => {
      setReceivedMessages((prev) => [newMessage, ...prev]);
    });
    return () => {
      disconnectWebSocket();
    };
  }, [user?.id]);

  const fetchMessages = async () => {
    try {
      const [receivedRes, sentRes] = await Promise.all([
        api.get('/api/messages/received'),
        api.get('/api/messages/sent'),
      ]);
      setReceivedMessages(receivedRes.data || []);
      setSentMessages(sentRes.data || []);
    } catch (err) {
      console.error('📛 메시지 목록 불러오기 실패:', err);
    }
  };

  const openDM = (receiver) => {
    console.log("🔍 openDM 호출됨 → receiver:", receiver);
    if (!receiver?.id || !receiver?.username) {
      console.warn("❌ 유효하지 않은 receiver 정보:", receiver);
      return;
    }
    setSelectedReceiver(receiver);
  };

  const closeDM = () => {
    setSelectedReceiver(null);
    fetchMessages(); // 새로고침
  };

  const messageBoxStyle = {
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    maxWidth: '100%',
    overflow: 'hidden'
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2>📨 받은 메시지</h2>
      <div style={{ marginBottom: '30px' }}>
        {receivedMessages.filter(msg => msg.senderId && msg.senderUsername).length > 0 ? (
          receivedMessages
            .filter(msg => msg.senderId && msg.senderUsername)
            .map((msg) => (
              <div
                key={msg.id}
                onClick={() => openDM({ id: msg.senderId, username: msg.senderUsername })}
                style={{ ...messageBoxStyle, background: '#f9f9f9' }}
              >
                <strong>{msg.senderUsername}</strong>:{" "}
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '300px' }}>{msg.content}</span>
              </div>
            ))
        ) : (
          <p>받은 메시지가 없습니다.</p>
        )}
      </div>

      <h2>✉️ 보낸 메시지</h2>
      <div>
        {sentMessages.filter(msg => msg.receiverId && msg.receiverUsername).length > 0 ? (
          sentMessages
            .filter(msg => msg.receiverId && msg.receiverUsername)
            .map((msg) => (
              <div
                key={msg.id}
                onClick={() => openDM({ id: msg.receiverId, username: msg.receiverUsername })}
                style={{ ...messageBoxStyle, background: '#eef6ff' }}
              >
                <strong>{msg.receiverUsername}</strong>:{" "}
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '300px' }}>{msg.content}</span>
              </div>
            ))
        ) : (
          <p>보낸 메시지가 없습니다.</p>
        )}
      </div>

      {selectedReceiver?.id && selectedReceiver?.username && (
  <DMModal receiver={selectedReceiver} onClose={closeDM} />
)}
    </div>
  );
}

export default DMListPage;

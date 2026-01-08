import React, { useState, useEffect } from 'react';
import Body from './Chat/Body';
import Chatty from './Chat/Chatty';

const Chat = ({ user, close }) => {
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [fetchedChats, setFetchedChats] = useState([]);

    function groupMessages(messages) {
        const map = new Map();

        messages.forEach(message => {
            const key = [message.sender_id, message.receiver_id].sort().join('-');
            if (!map.has(key)) {
                map.set(key, {
                    sent: message.sent,
                    received: message.received,
                    all_messages: []
                });
            }
            map.get(key).all_messages.push(message);
        });

        map.forEach(group => {
            group.all_messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            group.last_message = group.all_messages[group.all_messages.length - 1];
        });

        return Array.from(map.values());
    }

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch('/chats');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessages(data);
                const lastMessages = groupMessages(data);
                setFetchedChats(lastMessages);
            } catch (error) {
                // Error handling - could show toast notification
            }
        };

        // Initial fetch
        fetchChats();

        // Set up real-time updates with Echo
        if (window.Echo && user) {
            // Listen for new messages on user's private channel
            window.Echo.private(`user.${user.id}`)
                .listen('.MessageSent', (e) => {
                    if (e.message) {
                        setMessages((prev) => [...prev, e.message]);
                        const updatedMessages = [...messages, e.message];
                        const lastMessages = groupMessages(updatedMessages);
                        setFetchedChats(lastMessages);
                    }
                });

            // Listen for message read receipts
            window.Echo.private(`user.${user.id}`)
                .listen('.MessageRead', (e) => {
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === e.messageId ? { ...msg, read_at: e.readAt } : msg
                        )
                    );
                });

            return () => {
                window.Echo.leave(`user.${user.id}`);
            };
        }
    }, [user]);

    const selectChat = (chatId) => {
        const chatData = fetchedChats.find(msg => msg.sent.id === chatId || msg.received.id === chatId);
        setChat(chatData);
    };

    return (
        <div className='h-full'>
            {chat == null ? (
                <Body close={close} user={user} setChat={selectChat} chats={fetchedChats} />
            ) : (
                <Chatty setChat={setChat} selectChat={selectChat} close={close} user={user} chat={chat} />
            )}
        </div>
    );
};

export default Chat;

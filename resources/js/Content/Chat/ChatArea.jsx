import React, { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser'
import { BsThreeDotsVertical } from "react-icons/bs";
import MessageStatus from '@/Components/MessageStatus';

const ChatArea = ({ chatData, user, selectChat, chatuser: propChatUser }) => {
    const [chat, setChatData] = useState(chatData);
    const messagesEndRef = useRef(null);
    
    const chatuser = propChatUser || (chatData?.received.id !== user.id ? chatData?.received : chatData?.sent);

    useEffect(() => {
        if (chatuser) {
            selectChat(chatuser.id);
        }
    }, [chatuser, selectChat]);

    useEffect(() => {
        setChatData(chatData);
    }, [chatData]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat.all_messages]);

  return (
    <div
    className="flex-1 flex h-screen overflow-auto justify-end flex-col gap-2"
    
>
    {chat.all_messages.map((message, index) => (
        <div
            key={message.id || index}
            className={`flex mt-2 message group gap-2 w-full ${
                message.receiver_id === user.id ? '' : 'flex-row-reverse'
            }`}
        >
            <div className={`rounded-lg p-3 flex cursor-pointer max-w-72 ${
                message.receiver_id === user.id 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-primary-500 text-white'
            }`}>
                <div className="flex flex-col gap-1">
                    <p className={`${message.receiver_id === user.id ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                        {parse(message.message)}
                    </p>
                    <div className={`flex items-center gap-1 text-xs ${
                        message.receiver_id === user.id ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'
                    }`}>
                        <span>
                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.receiver_id !== user.id && (
                            <MessageStatus 
                                status={message.read_at ? 'read' : message.delivered_at ? 'delivered' : 'sent'} 
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="cursor-pointer opacity-0 group-hover:opacity-100 ease-in-out transition-all duration-150">
                <BsThreeDotsVertical size={28} height={28} width={7} />
            </div>
        </div>
    ))}
    <div ref={messagesEndRef} />
</div>

  )
}

export default ChatArea

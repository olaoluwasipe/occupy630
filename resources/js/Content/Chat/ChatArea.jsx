import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser'
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatArea = ({ chatData, user, selectChat }) => {

    const [chat, setChatData] = useState(chatData);

    const chatuser = chatData?.received.id !== user.id ? chatData?.received : chatData?.sent ;
    // console.log(chatuser)

    selectChat(chatuser?.id)

    useEffect(() => {
        setChatData(chatData);
        // console.log(chat)
    }, [chatData]);

  return (
    <div
    className="flex-1 flex h-screen overflow-auto justify-end flex-col gap-2"
    
>
    {chat.all_messages.map((message, index) => (
        <div
            key={index}
            className={`flex mt-2 message group gap-2 w-full ${
                message.receiver_id === user.id ? '' : 'flex-row-reverse'
            }`}
        >
            <div className="rounded p-3 border flex cursor-pointer max-w-72 float-right justify-between">
                <p>{parse(message.message)}</p>
            </div>
            <div className="cursor-pointer opacity-0 group-hover:opacity-100 ease-in-out transition-all duration-150">
                <BsThreeDotsVertical size={28} height={28} width={7} />
            </div>
        </div>
    ))}
</div>

  )
}

export default ChatArea

import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser'

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
    <div className='flex-1 flex overflow-auto max-h-screen justify-end flex-col gap-2'>
                        {chat.all_messages.map((message, index) => (
                            <div key={index} className={`flex mt-2 message group gap-2 w-full ${message.receiver_id === user.id ? '' : 'flex-row-reverse'}`}>
                                <div className='rounded p-3 border flex cursor-pointer max-w-72 float-right justify-between'>
                                    <p>{parse(message.message)}</p>
                                </div>
                                <div className='cursor-pointer opacity-0 group-hover:opacity-100 group-hover:opacity-1 ease-in-out transition-all duration-150'>
                                    <svg width="7" height="28" viewBox="0 0 7 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.5 20.5C2.57174 20.5 1.6815 20.8687 1.02513 21.5251C0.368749 22.1815 0 23.0717 0 24C0 24.9283 0.368749 25.8185 1.02513 26.4749C1.6815 27.1313 2.57174 27.5 3.5 27.5C4.42826 27.5 5.3185 27.1313 5.97487 26.4749C6.63125 25.8185 7 24.9283 7 24C7 23.0717 6.63125 22.1815 5.97487 21.5251C5.3185 20.8687 4.42826 20.5 3.5 20.5ZM3.5 10.5C2.57174 10.5 1.6815 10.8687 1.02513 11.5251C0.368749 12.1815 0 13.0717 0 14C0 14.9283 0.368749 15.8185 1.02513 16.4749C1.6815 17.1313 2.57174 17.5 3.5 17.5C4.42826 17.5 5.3185 17.1313 5.97487 16.4749C6.63125 15.8185 7 14.9283 7 14C7 13.0717 6.63125 12.1815 5.97487 11.5251C5.3185 10.8687 4.42826 10.5 3.5 10.5ZM7 4C7 3.07174 6.63125 2.1815 5.97487 1.52513C5.3185 0.868749 4.42826 0.5 3.5 0.5C2.57174 0.5 1.6815 0.868749 1.02513 1.52513C0.368749 2.1815 0 3.07174 0 4C0 4.92826 0.368749 5.8185 1.02513 6.47487C1.6815 7.13125 2.57174 7.5 3.5 7.5C4.42826 7.5 5.3185 7.13125 5.97487 6.47487C6.63125 5.8185 7 4.92826 7 4Z" fill="black"/>
                                    </svg>
                                </div>
                            </div>
                        ))}

                    </div>
  )
}

export default ChatArea

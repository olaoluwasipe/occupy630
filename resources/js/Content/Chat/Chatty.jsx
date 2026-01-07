import PrimaryButton from '@/Components/PrimaryButton'
import ProfilePhoto from '@/Components/ProfilePhoto'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import ChatArea from './ChatArea';
import { RiMailSendFill, RiSendPlaneFill } from "react-icons/ri";
import { FaImage } from 'react-icons/fa';
import { IoDocumentAttach } from "react-icons/io5";

const Chatty = ({ setChat, chat, user, selectChat }) => {

    const [chatData, setChatData] = useState(chat);
    const [message, setMessage] = useState('')

    const chatuser = chatData?.received.id !== user.id ? chatData?.received : chatData?.sent ;
    const { data, setData, post, processing, recentlySuccessful, errors, reset } = useForm({
        receiver_id: chatuser?.id || '',
        message: '',
    });

    useEffect(() => {
        const readMessages = async (id) => {
            const response = await fetch(`/read/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // post(route('message.read', id))
        }

        chatData.all_messages.map((message) => {
            readMessages(message.id)
        })
    }, [])

    useEffect(() => {
        reset();
    }, [recentlySuccessful]);

    useEffect(() => {
        setChatData(chat);
    }, [chat]);

    useEffect(() => {
        if (chatuser) {
            setData('receiver_id', chatuser.id);
        }
    }, [chatuser]);

    const handleKeyPress = () => {
        post(route('message.send'))
    }
  return (
    <div className='h-full'>

        <div className='flex flex-col h-full gap-3 justify-between'>
                    <div className='header h-12 border-b-2 pb-2 gap-3 flex w-full items-center'>
                        <div className='cursor-pointer' onClick={() => setChat(null)}>
                            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.488091 8.82337C-0.162697 9.47416 -0.162697 10.531 0.488091 11.1818L8.81817 19.5119C9.46896 20.1627 10.5258 20.1627 11.1766 19.5119C11.8274 18.8611 11.8274 17.8042 11.1766 17.1535L5.68398 11.666H21.6569C22.5784 11.666 23.3229 10.9215 23.3229 10C23.3229 9.07848 22.5784 8.33398 21.6569 8.33398H5.68918L11.1714 2.84654C11.8222 2.19576 11.8222 1.13888 11.1714 0.488091C10.5206 -0.162697 9.46375 -0.162697 8.81296 0.488091L0.482884 8.81817L0.488091 8.82337Z" fill="black"/>
                            </svg>
                        </div>
                        <div className='flex flex-row justify-between w-full items-center'>
                            <div className='flex items-center gap-3'>
                                <ProfilePhoto style='w-10' user={chatuser} />
                                <div className='flex-col'>
                                    <p className='font-medium'>{chatuser?.fname} {chatuser?.lname}</p>
                                    <span className='text-green-700 capitalize font-bold text-sm'>{chatuser?.type}</span>
                                </div>
                            </div>
                            <div className='cursor-pointer'>
                                <svg width="7" height="28" viewBox="0 0 7 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 20.5C2.57174 20.5 1.6815 20.8687 1.02513 21.5251C0.368749 22.1815 0 23.0717 0 24C0 24.9283 0.368749 25.8185 1.02513 26.4749C1.6815 27.1313 2.57174 27.5 3.5 27.5C4.42826 27.5 5.3185 27.1313 5.97487 26.4749C6.63125 25.8185 7 24.9283 7 24C7 23.0717 6.63125 22.1815 5.97487 21.5251C5.3185 20.8687 4.42826 20.5 3.5 20.5ZM3.5 10.5C2.57174 10.5 1.6815 10.8687 1.02513 11.5251C0.368749 12.1815 0 13.0717 0 14C0 14.9283 0.368749 15.8185 1.02513 16.4749C1.6815 17.1313 2.57174 17.5 3.5 17.5C4.42826 17.5 5.3185 17.1313 5.97487 16.4749C6.63125 15.8185 7 14.9283 7 14C7 13.0717 6.63125 12.1815 5.97487 11.5251C5.3185 10.8687 4.42826 10.5 3.5 10.5ZM7 4C7 3.07174 6.63125 2.1815 5.97487 1.52513C5.3185 0.868749 4.42826 0.5 3.5 0.5C2.57174 0.5 1.6815 0.868749 1.02513 1.52513C0.368749 2.1815 0 3.07174 0 4C0 4.92826 0.368749 5.8185 1.02513 6.47487C1.6815 7.13125 2.57174 7.5 3.5 7.5C4.42826 7.5 5.3185 7.13125 5.97487 6.47487C6.63125 5.8185 7 4.92826 7 4Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <ChatArea chatData={chatData} user={user} chatuser={chatuser} selectChat={selectChat} />

                    <div className='messageBox w-full flex gap-3'>
                        <div className='mt-2 rounded p-3 border flex cursor-pointer flex-1 justify-between'>
                            <TextInput
                                placeholder='Type in a message'
                                onChange={(e) => setData('message', e.target.value)}
                                value={data.message}
                                className='p-0 border-0 mr-1 outline-none focus:outline-none text-wrap overflow'
                            />
                            <div className='flex gap-4'>
                                <FaImage size={21} />
                                <IoDocumentAttach size={21}/>

                            </div>
                        </div>
                        <PrimaryButton onClick={() => handleKeyPress('click')} className='py-3'>
                            <RiSendPlaneFill size={21} />
                        </PrimaryButton>
                    </div>
                </div>
    </div>
  )
}

export default Chatty

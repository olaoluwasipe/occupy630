import PrimaryButton from '@/Components/PrimaryButton'
import ProfilePhoto from '@/Components/ProfilePhoto'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import ChatArea from './ChatArea';

const Chatty = ({ setChat, chat, user, selectChat }) => {

    const [chatData, setChatData] = useState(chat);
    const [message, setMessage] = useState('')

    const chatuser = chatData?.received.id !== user.id ? chatData?.received : chatData?.sent ;
    // console.log(chatuser)
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
        // console.log(chat)
    }, [recentlySuccessful]);

    useEffect(() => {
        setChatData(chat);
        // console.log(chat)
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
                                <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.25 3C0.25 1.34531 1.59531 0 3.25 0H21.25C22.9047 0 24.25 1.34531 24.25 3V18C24.25 19.6547 22.9047 21 21.25 21H3.25C1.59531 21 0.25 19.6547 0.25 18V3ZM15.4281 7.99219C15.2172 7.68281 14.8703 7.5 14.5 7.5C14.1297 7.5 13.7781 7.68281 13.5719 7.99219L9.49375 13.9734L8.25156 12.4219C8.03594 12.1547 7.7125 12 7.375 12C7.0375 12 6.70937 12.1547 6.49844 12.4219L3.49844 16.1719C3.22656 16.5094 3.175 16.9734 3.3625 17.3625C3.55 17.7516 3.94375 18 4.375 18H8.875H10.375H20.125C20.5422 18 20.9266 17.7703 21.1187 17.4C21.3109 17.0297 21.2875 16.5844 21.0531 16.2422L15.4281 7.99219ZM5.5 7.5C6.09674 7.5 6.66903 7.26295 7.09099 6.84099C7.51295 6.41903 7.75 5.84674 7.75 5.25C7.75 4.65326 7.51295 4.08097 7.09099 3.65901C6.66903 3.23705 6.09674 3 5.5 3C4.90326 3 4.33097 3.23705 3.90901 3.65901C3.48705 4.08097 3.25 4.65326 3.25 5.25C3.25 5.84674 3.48705 6.41903 3.90901 6.84099C4.33097 7.26295 4.90326 7.5 5.5 7.5Z" fill="#717171"/>
                                </svg>
                                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.875 0C1.42715 0 0.25 1.17715 0.25 2.625V18.375C0.25 19.8229 1.42715 21 2.875 21H13.375C14.8229 21 16 19.8229 16 18.375V6.5625H10.75C10.024 6.5625 9.4375 5.97598 9.4375 5.25V0H2.875ZM10.75 0V5.25H16L10.75 0ZM4.84375 10.5H11.4062C11.7672 10.5 12.0625 10.7953 12.0625 11.1562C12.0625 11.5172 11.7672 11.8125 11.4062 11.8125H4.84375C4.48281 11.8125 4.1875 11.5172 4.1875 11.1562C4.1875 10.7953 4.48281 10.5 4.84375 10.5ZM4.84375 13.125H11.4062C11.7672 13.125 12.0625 13.4203 12.0625 13.7812C12.0625 14.1422 11.7672 14.4375 11.4062 14.4375H4.84375C4.48281 14.4375 4.1875 14.1422 4.1875 13.7812C4.1875 13.4203 4.48281 13.125 4.84375 13.125ZM4.84375 15.75H11.4062C11.7672 15.75 12.0625 16.0453 12.0625 16.4062C12.0625 16.7672 11.7672 17.0625 11.4062 17.0625H4.84375C4.48281 17.0625 4.1875 16.7672 4.1875 16.4062C4.1875 16.0453 4.48281 15.75 4.84375 15.75Z" fill="#717171"/>
                                </svg>

                            </div>
                        </div>
                        <PrimaryButton onClick={() => handleKeyPress('click')} className='py-3'>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.9554 0.718854C20.3498 0.992235 20.5568 1.46479 20.4826 1.93735L17.9831 18.184C17.9245 18.5628 17.6941 18.8948 17.3582 19.0822C17.0224 19.2697 16.6201 19.2931 16.2647 19.1447L11.5938 17.2037L8.91858 20.0976C8.571 20.4765 8.02424 20.6015 7.54387 20.414C7.0635 20.2265 6.75106 19.7618 6.75106 19.2463V15.9813C6.75106 15.8251 6.80965 15.6767 6.91509 15.5634L13.4606 8.42038C13.6871 8.17434 13.6793 7.79551 13.445 7.56119C13.2107 7.32686 12.8318 7.31124 12.5858 7.53385L4.64213 14.591L1.19362 12.8648C0.779646 12.6578 0.514076 12.2438 0.50236 11.783C0.490644 11.3221 0.732781 10.8925 1.13114 10.6621L18.6275 0.664178C19.0454 0.425946 19.5609 0.449379 19.9554 0.718854Z" fill="white"/>
                            </svg>
                        </PrimaryButton>
                    </div>
                </div>
    </div>
  )
}

export default Chatty

import IconTextInput from '@/Components/IconTextInput'
import ProfilePhoto from '@/Components/ProfilePhoto';
import React, {useState} from 'react'
import parse from 'html-react-parser'
import { FaSearch } from 'react-icons/fa';

const Body = ({ close, chats, setChat, user }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredChats = chats?.filter((chat) =>
        chat.last_message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.received.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.sent.fname.toLowerCase().includes(searchQuery.toLowerCase())  ||
        chat.received.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.sent.lname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filteredChats.sort((a, b) => new Date(b.last_message.created_at) - new Date(a.last_message.created_at))
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  return (
    <div className='flex flex-col gap-3'>
                    <div onClick={() => close()} className='flex justify-end cursor-pointer'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5265 2.73247C16.1512 2.10776 16.1512 1.09324 15.5265 0.46853C14.9018 -0.156177 13.8872 -0.156177 13.2625 0.46853L8 5.73606L2.73247 0.473528C2.10776 -0.151179 1.09324 -0.151179 0.46853 0.473528C-0.156177 1.09824 -0.156177 2.11276 0.46853 2.73747L5.73606 8L0.473528 13.2675C-0.151179 13.8922 -0.151179 14.9068 0.473528 15.5315C1.09824 16.1562 2.11276 16.1562 2.73747 15.5315L8 10.2639L13.2675 15.5265C13.8922 16.1512 14.9068 16.1512 15.5315 15.5265C16.1562 14.9018 16.1562 13.8872 15.5315 13.2625L10.2639 8L15.5265 2.73247Z" fill="#464E5F"/>
                        </svg>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-semibold'>Chats</p>

                    </div>
                    <IconTextInput
                        icon = {<FaSearch size={17} />}
                        style={{borderRadious: '900px'}}
                        // rounded="rounded"
                        className=' bg-slate-100 mb-6'
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={handleSearch}

                        />
                    <div>
                        {filteredChats?.map((chat, index) => {
                            const chatuser = chat?.received.id !== user.id ? chat?.received : chat?.sent;
                            return (
                                <div onClick={() => setChat(chatuser.id)} key={index} className='py-4 relative cursor-pointer hover:bg-slate-100 transition-all bg-white border-b-2'>
                                    {chat.last_message.read == 0 && <div className='h-2 w-2 bg-red-800 rounded-lg absolute top-10 -left-2.5'></div>}

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-3'>
                                            <ProfilePhoto style='w-8 h-8' user={chatuser} />
                                            <p className='font-medium'>{chatuser?.fname} {chatuser?.lname}</p>
                                        </div>
                                        <span className='text-green-700 capitalize font-bold text-sm'>{chatuser.type}</span>
                                    </div>
                                    <div className='flex justify-between mt-2 items-center truncate'>
                                        <p className='truncate flex-1 pr-4 text-black'>{parse(chat.last_message.message)}</p>
                                        <p className='text-nowrap'>{formatDate(chat.last_message.created_at)}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>
  )
}

export default Body

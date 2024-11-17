import IconTextInput from '@/Components/IconTextInput'
import ProfilePhoto from '@/Components/ProfilePhoto';
import React, {useState} from 'react'
import parse from 'html-react-parser'
import { FaSearch } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const Body = ({ close, chats, setChat, user }) => {
    console.log(chats);
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
                        <FaX size={17} />
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
                                    {chat.last_message.read == 0 && chat.last_message.received.id == user.id ? <div className='h-2 w-2 bg-red-800 rounded-lg absolute top-10 -left-2.5'></div> : null}

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

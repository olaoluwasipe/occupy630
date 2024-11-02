import IconTextInput from '@/Components/IconTextInput'
import ProfilePhoto from '@/Components/ProfilePhoto';
import React, {useState} from 'react'

const Body = ({ close, chats, setChat, user }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredChats = chats?.filter((chat) =>
        chat.last_message.message.toLowerCase().includes(searchQuery.toLowerCase()) || chat.received.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.sent.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                        icon=<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.625 6.99905C13.625 8.43321 13.1595 9.75802 12.3752 10.8329L16.3309 14.7917C16.7215 15.1822 16.7215 15.8165 16.3309 16.2071C15.9403 16.5976 15.306 16.5976 14.9155 16.2071L10.9598 12.2483C9.88497 13.0357 8.56016 13.4981 7.126 13.4981C3.5359 13.4981 0.626953 10.5891 0.626953 6.99905C0.626953 3.40895 3.5359 0.5 7.126 0.5C10.7161 0.5 13.625 3.40895 13.625 6.99905ZM7.126 11.4984C7.71686 11.4984 8.30194 11.382 8.84782 11.1559C9.39371 10.9298 9.88971 10.5984 10.3075 10.1806C10.7253 9.76276 11.0567 9.26676 11.2828 8.72087C11.509 8.17499 11.6253 7.58991 11.6253 6.99905C11.6253 6.40819 11.509 5.82311 11.2828 5.27722C11.0567 4.73134 10.7253 4.23534 10.3075 3.81753C9.88971 3.39973 9.39371 3.06831 8.84782 2.8422C8.30194 2.61609 7.71686 2.49971 7.126 2.49971C6.53514 2.49971 5.95006 2.61609 5.40418 2.8422C4.85829 3.06831 4.36229 3.39973 3.94449 3.81753C3.52668 4.23534 3.19526 4.73134 2.96915 5.27722C2.74304 5.82311 2.62666 6.40819 2.62666 6.99905C2.62666 7.58991 2.74304 8.17499 2.96915 8.72087C3.19526 9.26676 3.52668 9.76276 3.94449 10.1806C4.36229 10.5984 4.85829 10.9298 5.40418 11.1559C5.95006 11.382 6.53514 11.4984 7.126 11.4984Z" fill="#717171"/>
                            </svg>
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
                                            <p className='font-medium'>{chatuser?.name}</p>
                                        </div>
                                        <span className='text-green-700 capitalize font-bold text-sm'>{chatuser.type}</span>
                                    </div>
                                    <div className='flex justify-between mt-2 items-center'>
                                        <p className='truncate flex-1 pr-4 text-black'>{chat.last_message.message}</p>
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

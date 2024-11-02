import DangerButton from '@/Components/DangerButton';
import IconTextInput from '@/Components/IconTextInput'
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton'
import ProfilePhoto from '@/Components/ProfilePhoto';
import ForumAddForm from '@/Forms/ForumAddForm'
import parse from 'html-react-parser'
import React, { useState, useEffect } from 'react'

const fileIcons = {
    pdf: '/icons/pdf.png',
    docx: '/icons/docx.png',
    image: '/icons/image.png',
    zip: '/icons/zip.png',
    unknown: '/icons/unknown.png',
};

const getFileIcon = (fileType) => {
    if (fileType.includes('image')) return fileIcons.image;
    if (fileType.includes('pdf')) return fileIcons.pdf;
    if (fileType.includes('doc')) return fileIcons.docx;
    return fileIcons[fileType] || fileIcons.unknown;
};

const Forum = ({ showAction = true, forums, cohort }) => {
    const [forumData, setForumData] = useState(forums);
    const [searchQuery, setSearchQuery] = useState('');
    const [forum, setForum] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setForumData(forumData)
    }, [forumData])

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const response = await fetch('/forums/'+cohort);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setForumData(data);
                // console.log(data)
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        const intervalId = setInterval(fetchForums, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const modalOpen = () => {
        setOpenModal(!openModal)
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const fixDate = (dateString) => {
        const oldate = new Date(dateString).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
        return oldate
    }

    const filteredForums = forumData?.filter((forum) =>
        forum.title.toLowerCase().includes(searchQuery.toLowerCase()) || forum.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getForum = forumData?.find((foru) => foru.id === forum?.id)

    function formatDate(dateString) {
        const date = new Date(dateString);

        // Get components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour time to 12-hour time
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const strTime = hours + ':' + minutes + ' ' + ampm;

        return `${strTime}, ${year}-${month}-${day}`;
    }

  return (
    <div className='flex flex-col gap-5'>
        <Modal show={openModal}  >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>{forum ? 'Reply' : 'Create'} Post</p>
                    <DangerButton onClick={modalOpen}>Close</DangerButton>
                </div>

                <ForumAddForm forum={forum} cohort={cohort} close= {()=> setOpenModal(false)} />
            </div>
        </Modal>
        {forum === null ? (
            <>
            <div className='flex items-center justify-between'>
                <h4 className='font-bold'>Forum</h4>
                {showAction && (
                    <div className='searchBar w-1/2 flex gap-2'>
                        <IconTextInput
                            icon={<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.625 6.99905C13.625 8.43321 13.1595 9.75802 12.3752 10.8329L16.3309 14.7917C16.7215 15.1822 16.7215 15.8165 16.3309 16.2071C15.9403 16.5976 15.306 16.5976 14.9155 16.2071L10.9598 12.2483C9.88497 13.0357 8.56016 13.4981 7.126 13.4981C3.5359 13.4981 0.626953 10.5891 0.626953 6.99905C0.626953 3.40895 3.5359 0.5 7.126 0.5C10.7161 0.5 13.625 3.40895 13.625 6.99905ZM7.126 11.4984C7.71686 11.4984 8.30194 11.382 8.84782 11.1559C9.39371 10.9298 9.88971 10.5984 10.3075 10.1806C10.7253 9.76276 11.0567 9.26676 11.2828 8.72087C11.509 8.17499 11.6253 7.58991 11.6253 6.99905C11.6253 6.40819 11.509 5.82311 11.2828 5.27722C11.0567 4.73134 10.7253 4.23534 10.3075 3.81753C9.88971 3.39973 9.39371 3.06831 8.84782 2.8422C8.30194 2.61609 7.71686 2.49971 7.126 2.49971C6.53514 2.49971 5.95006 2.61609 5.40418 2.8422C4.85829 3.06831 4.36229 3.39973 3.94449 3.81753C3.52668 4.23534 3.19526 4.73134 2.96915 5.27722C2.74304 5.82311 2.62666 6.40819 2.62666 6.99905C2.62666 7.58991 2.74304 8.17499 2.96915 8.72087C3.19526 9.26676 3.52668 9.76276 3.94449 10.1806C4.36229 10.5984 4.85829 10.9298 5.40418 11.1559C5.95006 11.382 6.53514 11.4984 7.126 11.4984Z" fill="#717171"/>
                                </svg>}
                            className='w-full'
                            placeholder='Search for documents, images or videos'
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <PrimaryButton onClick={modalOpen} className='flex text-nowrap items-center gap-2 capitalize'>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.65385 1.15385C8.65385 0.515625 8.13822 0 7.5 0C6.86178 0 6.34615 0.515625 6.34615 1.15385V6.34615H1.15385C0.515625 6.34615 0 6.86178 0 7.5C0 8.13822 0.515625 8.65385 1.15385 8.65385H6.34615V13.8462C6.34615 14.4844 6.86178 15 7.5 15C8.13822 15 8.65385 14.4844 8.65385 13.8462V8.65385H13.8462C14.4844 8.65385 15 8.13822 15 7.5C15 6.86178 14.4844 6.34615 13.8462 6.34615H8.65385V1.15385Z" fill="white"/>
                            </svg>
                            Create a post
                        </PrimaryButton>
                    </div>
                )}
            </div>
            {filteredForums.length > 0 ? filteredForums?.map((forum, i) => (
                <div key={i} className='flex flex-col justify-center px-6 bg-gray-100 border-l-4 border-l-blue-500 w-full p-3 text-center rounded-lg h-100'>
                    <div className='flex flex-row gap-3 items-center justify-between font-semibold text-sm'>
                        <p className={`p-2 bg-gray-200 rounded`}>{forum.category}</p>
                        <p onClick={() => setForum(forum)} className={`p-2 bg-gray-300 rounded cursor-pointer`}>Open Thread</p>
                    </div>
                    <div className='flex flex-row flex-wrap justify-between items-center'>
                        <div className='flex flex-col gap-3 w-3/4 text-left'>
                            <p className='font-semibold text-gray-800 text-xl'>{forum.title}</p>
                            {forum.description && (
                                <p className='text-gray-500'>{parse(forum.description)}</p>
                            )}
                            <div className='flex flex-row gap-2 items-center mt-2'>
                                <p className='font-'>{forum.user.name} | </p>
                                <p className={`capitalize font-semibold ${forum.user.type == 'learner' ? 'text-blue-700' : 'text-green-700'}`}>{forum.user.type}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-1/4 text-right'>
                            <p className='flex items-center'>
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.9993 7.46429C17.9993 11.3114 14.1623 14.4286 9.42789 14.4286C8.1857 14.4286 7.00713 14.2143 5.9424 13.8292C5.54396 14.1205 4.89441 14.519 4.12432 14.8538C3.32075 15.202 2.35311 15.5 1.39218 15.5C1.17454 15.5 0.980346 15.3694 0.89664 15.1685C0.812935 14.9676 0.85981 14.74 1.01048 14.5859L1.02052 14.5759C1.03057 14.5658 1.04396 14.5525 1.06405 14.529C1.10088 14.4888 1.1578 14.4252 1.22811 14.3382C1.36539 14.1708 1.54954 13.923 1.73704 13.615C2.07186 13.0592 2.38994 12.3292 2.45356 11.5089C1.4491 10.3705 0.856462 8.97433 0.856462 7.46429C0.856462 3.61719 4.69352 0.5 9.42789 0.5C14.1623 0.5 17.9993 3.61719 17.9993 7.46429Z" fill="#717171"/>
                            </svg>
                            {forum.replies.length} Replies | {formatDate(forum.created_at)}</p>
                        </div>
                    </div>
                </div>
            )) : (
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-gray-500 text-xl'>No forum posts found</p>
                </div>
            )}

            </>

        ) : (
            <div>
                <div onClick={() => setForum(null)} className="flex flex-row gap-3 cursor-pointer bg-gray-200 items-center p-2 mb-3">
                    <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.351398 5.6529C-0.117133 6.12143 -0.117133 6.88232 0.351398 7.35085L5.14915 12.1486C5.61768 12.6171 6.37857 12.6171 6.8471 12.1486C7.31563 11.6801 7.31563 10.9192 6.8471 10.4506L4.09589 7.69944H17.9906C18.6541 7.69944 19.1901 7.16344 19.1901 6.5C19.1901 5.83656 18.6541 5.30056 17.9906 5.30056H4.09589L6.8471 2.54935C7.31563 2.08082 7.31563 1.31993 6.8471 0.851398C6.37857 0.382867 5.61768 0.382867 5.14915 0.851398L0.351398 5.64915V5.6529Z" fill="black"/>
                    </svg>
                    <p className='font-medium text-sm'>back to forum</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p className='text-2xl font-semibold text-gray-700'>{getForum?.title}</p>
                    <p className={`p-2 bg-gray-200 rounded`}>{getForum.category}</p>
                </div>
                <div className='flex flex-row w-full justify-between'>
                    <div className='w-1/2 flex flex-row gap-3 items-center justify-start'>
                        <ProfilePhoto style='w-10' user={getForum.user} />
                        <p className='font-bold'>{getForum.user.name} | <span className='text-green-700 capitalize'>{forum.user.type}</span></p>
                    </div>
                    <p className='text-gray-500'>{formatDate(getForum.created_at)}</p>
                </div>
                <div>
                    {getForum?.description && <p className='text-gray-500'>{parse(getForum.description)}</p>}
                </div>
                {getForum?.attachments?.length > 0 && (
                <div className='flex gap-3 my-3 items-center'>
                    <p>Attachments:</p>
                    {JSON.parse(getForum.attachments).map((attachment, i) => (
                        <div className='p-2 w-32 bg-blue-300 rounded overflow-hidden flex items-center gap-2' title={attachment.file_name} key={i}>
                            <img src={getFileIcon(attachment.file_type)} alt='file type icon' className='w-6 h-6' />
                            <a href={'/storage/' + attachment.file_path} download className='text-gray-800 word-overflow whitespace-nowrap break-keep text-l font-semibold'>
                                {attachment.file_name}
                            </a>

                        </div>
                    ))}
                </div>
                )}
                <div className='mt-4 flex flex-wrap gap-3'>
                    <p className='font-semibold w-full'>Drop a comment</p>
                    <div onClick={modalOpen} className='mt-2 rounded p-3 border flex cursor-pointer flex-1 justify-between'>
                        <p className='ml-3 text-gray-500'>Type in a comment</p>
                        <div className='flex gap-4'>
                            <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.25 3C0.25 1.34531 1.59531 0 3.25 0H21.25C22.9047 0 24.25 1.34531 24.25 3V18C24.25 19.6547 22.9047 21 21.25 21H3.25C1.59531 21 0.25 19.6547 0.25 18V3ZM15.4281 7.99219C15.2172 7.68281 14.8703 7.5 14.5 7.5C14.1297 7.5 13.7781 7.68281 13.5719 7.99219L9.49375 13.9734L8.25156 12.4219C8.03594 12.1547 7.7125 12 7.375 12C7.0375 12 6.70937 12.1547 6.49844 12.4219L3.49844 16.1719C3.22656 16.5094 3.175 16.9734 3.3625 17.3625C3.55 17.7516 3.94375 18 4.375 18H8.875H10.375H20.125C20.5422 18 20.9266 17.7703 21.1187 17.4C21.3109 17.0297 21.2875 16.5844 21.0531 16.2422L15.4281 7.99219ZM5.5 7.5C6.09674 7.5 6.66903 7.26295 7.09099 6.84099C7.51295 6.41903 7.75 5.84674 7.75 5.25C7.75 4.65326 7.51295 4.08097 7.09099 3.65901C6.66903 3.23705 6.09674 3 5.5 3C4.90326 3 4.33097 3.23705 3.90901 3.65901C3.48705 4.08097 3.25 4.65326 3.25 5.25C3.25 5.84674 3.48705 6.41903 3.90901 6.84099C4.33097 7.26295 4.90326 7.5 5.5 7.5Z" fill="#717171"/>
                            </svg>
                            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.875 0C1.42715 0 0.25 1.17715 0.25 2.625V18.375C0.25 19.8229 1.42715 21 2.875 21H13.375C14.8229 21 16 19.8229 16 18.375V6.5625H10.75C10.024 6.5625 9.4375 5.97598 9.4375 5.25V0H2.875ZM10.75 0V5.25H16L10.75 0ZM4.84375 10.5H11.4062C11.7672 10.5 12.0625 10.7953 12.0625 11.1562C12.0625 11.5172 11.7672 11.8125 11.4062 11.8125H4.84375C4.48281 11.8125 4.1875 11.5172 4.1875 11.1562C4.1875 10.7953 4.48281 10.5 4.84375 10.5ZM4.84375 13.125H11.4062C11.7672 13.125 12.0625 13.4203 12.0625 13.7812C12.0625 14.1422 11.7672 14.4375 11.4062 14.4375H4.84375C4.48281 14.4375 4.1875 14.1422 4.1875 13.7812C4.1875 13.4203 4.48281 13.125 4.84375 13.125ZM4.84375 15.75H11.4062C11.7672 15.75 12.0625 16.0453 12.0625 16.4062C12.0625 16.7672 11.7672 17.0625 11.4062 17.0625H4.84375C4.48281 17.0625 4.1875 16.7672 4.1875 16.4062C4.1875 16.0453 4.48281 15.75 4.84375 15.75Z" fill="#717171"/>
                            </svg>

                        </div>
                    </div>
                    <PrimaryButton className='py-3'>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9554 0.718854C20.3498 0.992235 20.5568 1.46479 20.4826 1.93735L17.9831 18.184C17.9245 18.5628 17.6941 18.8948 17.3582 19.0822C17.0224 19.2697 16.6201 19.2931 16.2647 19.1447L11.5938 17.2037L8.91858 20.0976C8.571 20.4765 8.02424 20.6015 7.54387 20.414C7.0635 20.2265 6.75106 19.7618 6.75106 19.2463V15.9813C6.75106 15.8251 6.80965 15.6767 6.91509 15.5634L13.4606 8.42038C13.6871 8.17434 13.6793 7.79551 13.445 7.56119C13.2107 7.32686 12.8318 7.31124 12.5858 7.53385L4.64213 14.591L1.19362 12.8648C0.779646 12.6578 0.514076 12.2438 0.50236 11.783C0.490644 11.3221 0.732781 10.8925 1.13114 10.6621L18.6275 0.664178C19.0454 0.425946 19.5609 0.449379 19.9554 0.718854Z" fill="white"/>
                        </svg>
                    </PrimaryButton>
                </div>
                <p className='flex gap-3 items-center mt-1'>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9993 7.46429C17.9993 11.3114 14.1623 14.4286 9.42789 14.4286C8.1857 14.4286 7.00713 14.2143 5.9424 13.8292C5.54396 14.1205 4.89441 14.519 4.12432 14.8538C3.32075 15.202 2.35311 15.5 1.39218 15.5C1.17454 15.5 0.980346 15.3694 0.89664 15.1685C0.812935 14.9676 0.85981 14.74 1.01048 14.5859L1.02052 14.5759C1.03057 14.5658 1.04396 14.5525 1.06405 14.529C1.10088 14.4888 1.1578 14.4252 1.22811 14.3382C1.36539 14.1708 1.54954 13.923 1.73704 13.615C2.07186 13.0592 2.38994 12.3292 2.45356 11.5089C1.4491 10.3705 0.856462 8.97433 0.856462 7.46429C0.856462 3.61719 4.69352 0.5 9.42789 0.5C14.1623 0.5 17.9993 3.61719 17.9993 7.46429Z" fill="#717171"/>
                    </svg>
                    {getForum.replies.length} comments
                </p>
                <hr className='my-3'></hr>
                <div className='flex flex-col gap-3'>
                    {getForum.replies.length > 0 ? getForum.replies.map((reply) => (
                        <div key={reply.id} className='rounded p-3 bg-blue-100'>
                            <div className='flex flex-row w-full justify-between'>
                                <div className='w-1/2 flex flex-row gap-3 items-center justify-start'>
                                    <ProfilePhoto style='w-10' user={reply.user} />
                                    <p className='font-bold'>{reply.user.name} | <span className='text-green-700 capitalize'>{reply.user.type}</span></p>
                                </div>
                                <p className='text-gray-500'>{formatDate(reply.created_at)}</p>
                            </div>
                            <div className='mt-2'>
                                {parse(reply.description)}
                            </div>
                            {reply?.attachments?.length > 0 && (
                            <div className='flex gap-3 my-3 items-center'>
                                <p>Attachments:</p>
                                {JSON.parse(reply.attachments).map((attachment, i) => (
                                    <div key={i} className='p-2 w-32 bg-blue-300 rounded overflow-hidden flex items-center gap-2' title={attachment.file_name}>
                                        <img src={getFileIcon(attachment.file_type)} alt='file type icon' className='w-6 h-6' />
                                        <a href={'/storage/' + attachment.file_path} download className='text-gray-800 word-overflow whitespace-nowrap break-keep text-l font-semibold'>
                                            {attachment.file_name}
                                        </a>

                                    </div>
                                ))}
                            </div>
                            )}
                        </div>
                    )) : (
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-gray-500 text-xl'>No posts found</p>
                        </div>
                    )}
                </div>
            </div>
        )}
        </div>
  )
}

export default Forum

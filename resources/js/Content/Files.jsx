import IconTextInput from '@/Components/IconTextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import React, { useState } from 'react'

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

const downloadFile = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Files = ({ showAction = true, files, openFile }) => {

    console.log(files)
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredFiles = files?.filter((file) => 
        file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h4>Files & Resources</h4>
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
                        <PrimaryButton onClick={openFile} className='flex items-center gap-2 capitalize'>
                            <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.94237 5.2002C10.0537 4.94238 10.001 4.64355 9.80761 4.43848L5.82323 0.219727C5.6914 0.0791016 5.50683 0 5.31347 0C5.12011 0 4.93554 0.0791016 4.8037 0.219727L0.819327 4.43848C0.625968 4.64355 0.573233 4.94238 0.684562 5.2002C0.79589 5.45801 1.04784 5.625 1.32909 5.625H3.43847V14.0625C3.43847 14.5811 3.85741 15 4.37597 15H6.25097C6.76952 15 7.18847 14.5811 7.18847 14.0625V5.625H9.29784C9.57909 5.625 9.83105 5.45801 9.94237 5.2002Z" fill="white"/>
                            </svg>
                            Upload
                        </PrimaryButton>
                    </div>
                )}
            </div>

            {filteredFiles?.map((file) => (
                <div key={file.id} className='flex items-center gap-2'>
                    <img src={getFileIcon(file.file_type)} alt='file type icon' className='w-6 h-6' />
                    <div className='flex flex-col'>
                        <a href={file.file_path} download onClick={() => downloadFile(file.file_path)} className='text-gray-800 text-l font-semibold'>
                            {file.file_name}
                        </a>
                        {file.user && (
                            <a href='#' className='text-blue-500 text-xs'>
                                Uploaded by {file.user.name}
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Files

import React, { useState, useEffect, useRef } from 'react';

const ImageInput = ({ onFileChange, preselected }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrls, setPreviewUrls] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

    const handleDivClick = () => {
        // Trigger the click event on the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length) {
            setSelectedFile(files);
            setPreviewUrls(URL.createObjectURL(files[0]));
            if (onFileChange) {
                onFileChange(files);
            }
        }
    };

    useEffect(() => {
        if (preselected && preselected.length) {
            // const preselectedFiles = preselected.map(fileUrl => ({
            //     url: fileUrl
            // }));
            setPreviewUrls(preselected);
        }
    }, [preselected]);

    const handleRemoveFile = (index) => {
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
        setSelectedFiles(newSelectedFiles);
        setPreviewUrls(newPreviewUrls);
        if (onFileChange) {
            onFileChange(newSelectedFiles);
        }
    };

    return (
        <div className="file-input">
            <img onClick={handleDivClick} className="w-10 h-10 rounded-full" src={previewUrls} alt="Rounded avatar" />
            <input
                type='file'
                name='attachment'
                ref={fileInputRef}
                className='hidden'
                accept='image/*'
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageInput;

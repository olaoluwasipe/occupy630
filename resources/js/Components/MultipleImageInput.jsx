import React, { useState, useEffect, useRef } from 'react';
import SecondaryButton from './SecondaryButton';

const MultipleImageInput = ({ onFileChange, preselected, rounded = true, title, showImages = true }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setSelectedFiles(prevFiles => {
                const updatedFiles = [...prevFiles, ...files];
                if (onFileChange) {
                    onFileChange(updatedFiles);
                }
                const newPreviewUrls = files.map(file => URL.createObjectURL(file));
                setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
                return updatedFiles;
            });
        }
    };

    useEffect(() => {
        if (preselected && preselected.length) {
            setPreviewUrls(preselected);
        }
    }, [preselected]);

    useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    const handleRemoveFile = (e, index) => {
        e.preventDefault();
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

        // Clean up object URL
        URL.revokeObjectURL(previewUrls[index]);

        setSelectedFiles(newSelectedFiles);
        setPreviewUrls(newPreviewUrls);
        if (onFileChange) {
            onFileChange(newSelectedFiles);
        }
    };

    return (
        <div className="file-input">
            <div className="flex items-center gap-3">
                <input
                    type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                    name="images"
                    id="images"
                    multiple
                />
                {title && <label className='font-medium'>{title}</label>}
                <SecondaryButton onClick={handleDivClick}>
                    Add Images
                </SecondaryButton>
            </div>
            {(previewUrls.length > 0 && showImages) && (
                <div className="flex w-full mt-4 p-3 border-2 border rounded-md flex-wrap gap-3">
                    {previewUrls.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image}
                                alt={`Preview ${index}`}
                                className={`w-24 h-24 object-cover ${rounded ? 'rounded-md' : ''}`}
                            />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                                onClick={(e) => handleRemoveFile(e, index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultipleImageInput;

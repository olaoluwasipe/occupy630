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
            setSelectedFiles((prevFiles) => {
                const existingFileNames = new Set(prevFiles.map(file => file.name + file.size));
                const newFiles = files.filter(file => !existingFileNames.has(file.name + file.size));
                const updatedFiles = [...prevFiles, ...newFiles];
                if (onFileChange) onFileChange(updatedFiles);
                return updatedFiles;
            });

            setPreviewUrls((prevUrls) => {
                const newPreviewUrls = files.map(file => URL.createObjectURL(file));

                // Filter out duplicates by checking against existing URLs
                const uniquePreviewUrls = newPreviewUrls.filter(url => !prevUrls.includes(url));

                return [...prevUrls, ...uniquePreviewUrls];
            });
            console.log(previewUrls)
        }
    };

    const doesFileExist = (file, filesArray) => {
        return filesArray.some(
            (existingFile) =>
                existingFile.name === file.name &&
                existingFile.size === file.size &&
                existingFile.type === file.type
        );
    };

    useEffect(() => {
        if (preselected && preselected.length && !preselected.some((item) => item instanceof File)) {
            setPreviewUrls(preselected);
            setSelectedFiles(preselected.map((url, index) => ({ name: `preselected-${index}`, size: 0, url })));
        }
    }, [preselected]);

    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    const handleRemoveFile = (e, index) => {
        e.preventDefault();
        setSelectedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            if (onFileChange) onFileChange(updatedFiles.filter(file => !file.url)); // Exclude preselected
            return updatedFiles;
        });

        setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };

    return (
        <div className="file-input">
            <div className="flex items-center gap-3">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    name="images"
                    id="images"
                    multiple
                />
                {title && <label className="font-medium">{title}</label>}
                <SecondaryButton onClick={handleDivClick}>Add Images</SecondaryButton>
            </div>
            {(previewUrls.length > 0 && showImages) && (
                <div className="flex w-full mt-4 p-3 border-2 border rounded-md flex-wrap gap-3">
                    {previewUrls.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image.url || image}
                                alt={`Preview ${index}`}
                                className={`w-24 h-24 object-cover ${rounded ? 'rounded-md' : ''}`}
                            />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                                onClick={(e) => handleRemoveFile(e, index)}
                                aria-label={`Remove image ${index + 1}`}
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

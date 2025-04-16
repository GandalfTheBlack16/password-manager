import { useState, FormEvent } from 'react';
import { FileUploader } from "react-drag-drop-files";
import './FIles.css';

export function Files() {
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        console.log('Files to upload:', formData.getAll('files'));
    }

    const handleFileChange = (newFiles: FileList) => {
        const fileArray = Array.from(newFiles);
        const filter = fileArray.filter(file => !files.some(existingFile => existingFile.name === file.name));
        setFiles(prevFiles => [...prevFiles, ...filter]);
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Upload files</h2>
            <form className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
                <FileUploader  
                    handleChange={handleFileChange}
                    name="files"
                    types={["JPG", "PNG", "GIF"]}
                    fileOrFiles={files}
                    multiple={true}
                />
                <div className="flex flex-col gap-2">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <p className="text-gray-700">{file.name}</p>
                            <button 
                                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                className="text-red-500 hover:text-red-700"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from '@shadcn/ui/file-upload'

import { useState } from 'react'

const ExcelFileUpload = () => {
  const [files, setFiles] = useState<File[] | null>([])

  const dropzone = {
    accept: {
      'files/*': ['xlsx', 'csv']
    },
    multiple: false,
    // maxFiles: 4,
    maxSize: 1 * 1024 * 1024
  }

  return (
    <FileUploader value={files} onValueChange={setFiles} dropzoneOptions={dropzone}>
      <FileInput>
        <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
          <p className="text-gray-400">Drop files here</p>
        </div>
      </FileInput>
      <FileUploaderContent className="flex items-center flex-row gap-2">
        {files?.map((file, i) => (
          <FileUploaderItem
            key={i}
            index={i}
            className="size-20 p-0 rounded-md overflow-hidden"
            aria-roledescription={`file ${i + 1} containing ${file.name}`}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              height={80}
              width={80}
              className="size-20 p-0"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  )
}

export default ExcelFileUpload

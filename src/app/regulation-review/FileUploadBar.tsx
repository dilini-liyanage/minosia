'use client';

import React, { useEffect, useState } from 'react';

import { X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import pdfIcon from '../../../public/file-icons/pdf-icon.svg';

interface FileData {
  title: string;
}

interface FileUploadBarProps {
  onFileUploadChange: (hasUploadedFile: boolean) => void;
}

const FileUploadBar: React.FC<FileUploadBarProps> = ({
  onFileUploadChange,
}) => {
  const [selectedRegulation, setSelectedRegulation] = useState('');
  const [selectedApplicationType, setSelectedApplicationType] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    onFileUploadChange(files.length > 0);
  }, [files, onFileUploadChange]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFile: FileData = {
        title: file.name,
      };
      setFiles([...files, newFile]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div className="flex justify-between space-x-4 p-2 bg-[#F9F9FB] border border-gray-200 rounded-lg">
      <div className="flex">
        <Select onValueChange={(value) => setSelectedRegulation(value)}>
          <SelectTrigger className="w-auto bg-none">
            <SelectValue
              placeholder="Select Regulation"
              className="text-sm font-normal bg-none"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regulation1" className="text-sm">
              UK NICE Health Technology Evaluation
            </SelectItem>
            <SelectItem value="regulation2" className="text-sm">
              Regulation 2
            </SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSelectedApplicationType(value)}>
          <SelectTrigger className="w-auto bg-none">
            <SelectValue
              placeholder="Application Type"
              className="text-sm font-normal bg-none"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="type1" className="text-sm">
              Health technology assessment
            </SelectItem>
            <SelectItem value="type2" className="text-sm">
              Type 2
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        {files.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {files[files.length - 1].title}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFile(files.length - 1)}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <button className="flex bg-black text-white py-2 px-4 rounded-lg items-center cursor-pointer gap-2">
          <Image src={pdfIcon} alt="PDF" width={20} height={20} />
          <label className="text-sm font-normal">
            Upload file
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </button>
      </div>
    </div>
  );
};

export default FileUploadBar;

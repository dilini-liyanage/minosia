'use client';

import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import Image from 'next/image';
import { FileIcon, defaultStyles } from 'react-file-icon';

import excelIcon from '../../../public/file-icons/excel-icon.svg';
import pdfIcon from '../../../public/file-icons/pdf-icon.svg';
import wordIcon from '../../../public/file-icons/word-icon.svg';

interface FileData {
  title: string;
  fileType: string;
  dateModified: string;
  documentOwner: string;
  fileCategory: string;
}

const ITEMS_PER_PAGE = 13;

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'Word File':
      return wordIcon;
    case 'Excel File':
      return excelIcon;
    case 'Pdf File':
      return pdfIcon;
  }
};

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState<FileData[]>([]);
  const [viewType, setViewType] = useState<'project' | 'organizational'>(
    'organizational'
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const initialData: FileData[] = [
      {
        title: 'Clinical Trial Data.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'Clinical Trial Data.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'sample.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'test.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'abc.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'draft.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'trial.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'new.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'hospital.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'school-data.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'government.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'Clinical Trial Data.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'Clinical Trial Data.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'Clinical Trial Data.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'sample.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'test.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'abc.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'draft.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'trial.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'new.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'hospital.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'school-data.xlsx',
        fileType: 'Excel File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
      {
        title: 'government.docx',
        fileType: 'Word File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'organizational',
      },
      {
        title: 'Clinical Trial Data.pdf',
        fileType: 'Pdf File',
        dateModified: '2023-06-01',
        documentOwner: 'Maya Carter',
        fileCategory: 'project',
      },
    ];
    setFiles(initialData);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let fileType = 'Unknown File';
      if (fileExtension === 'docx' || fileExtension === 'doc')
        fileType = 'Word File';
      else if (fileExtension === 'xlsx' || fileExtension === 'xls')
        fileType = 'Excel File';
      else if (fileExtension === 'pptx' || fileExtension === 'ppt')
        fileType = 'PowerPoint File';
      else if (fileExtension === 'pdf') fileType = 'Pdf File';

      const newFile: FileData = {
        title: file.name,
        fileType,
        dateModified: format(new Date(), 'yyyy-MM-dd'),
        documentOwner: 'Maya Carter',
        fileCategory: viewType,
      };
      setFiles([...files, newFile]);
    }
  };

  const filteredFiles = files.filter(
    (file) =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      file.fileCategory === viewType
  );

  const pageCount = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <div className="flex border rounded-lg">
            <Image
              src="/icons/search.svg"
              alt="file-upload-icon"
              width={20}
              height={20}
              className="ms-3"
            />
            <input
              type="text"
              placeholder="Search Files"
              className="border-none focus:outline-none p-4 rounded-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="flex bg-black text-white px-4 rounded-lg items-center cursor-pointer gap-2">
            <Image
              src="/icons/file-upload-icon.svg"
              alt="file-upload-icon"
              width={20}
              height={20}
            />
            <label>
              Add File
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
        <div className="flex space-x-2 bg-[#F1F1F1] p-2 rounded-lg font-semibold">
          <button
            className={`px-4 py-2 rounded-lg ${viewType === 'project' ? 'bg-white' : 'bg-[#F1F1F1]'}`}
            onClick={() => setViewType('project')}
          >
            Project Files
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${viewType === 'organizational' ? 'bg-white' : 'bg-[#F1F1F1]'}`}
            onClick={() => setViewType('organizational')}
          >
            Organizational Files
          </button>
        </div>
      </div>
      <div className="text-xl font-bold mb-3 mt-5">
        {viewType === 'project'
          ? 'Project Documents'
          : 'Organizational Documents'}
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="border border-[#E8E9E9] items-center">
              <th className="p-2 border border-[#E8E9E9]">Document Title</th>
              <th className="p-2 border border-[#E8E9E9]">File Type</th>
              <th className="p-2 border border-[#E8E9E9]">Date Modified</th>
              <th className="p-2 border border-[#E8E9E9]">Document Owner</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.map((file, index) => (
              <tr key={index}>
                <td className="p-2 border border-[#E8E9E9] ps-5">
                  {file.title}
                </td>
                <td className="p-2 flex items-center justify-center border-b border-[#E8E9E9]">
                  <Image
                    src={getFileIcon(file.fileType)}
                    alt={file.fileType}
                    width={24}
                    height={24}
                    className="mr-3"
                  />
                  {file.fileType}
                </td>
                <td className="p-2 border border-[#E8E9E9] text-center">
                  {file.dateModified}
                </td>
                <td className="p-2 border border-[#E8E9E9] text-center">
                  <div className="flex justify-center">
                    <Image
                      src="/icons/profile-frame.svg"
                      alt="profile-frame"
                      width={24}
                      height={24}
                      className="mr-3"
                    />
                    {file.documentOwner}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-end space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          {currentPage} of {pageCount}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount))
          }
          disabled={currentPage === pageCount}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Library;

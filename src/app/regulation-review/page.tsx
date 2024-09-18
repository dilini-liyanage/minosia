'use client';

import React, { useState } from 'react';

import FileUploadBar from './FileUploadBar';
import RegulationReviewDocumentLayout from './regulationReviewDocumentLayout';

export default function RegulationReview() {
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  const handleFileUploadChange = (hasFile: boolean) => {
    setHasUploadedFile(hasFile);
  };
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <FileUploadBar onFileUploadChange={handleFileUploadChange} />
      <div className="flex-1 overflow-hidden mt-4 ">
        {hasUploadedFile && <RegulationReviewDocumentLayout />}
      </div>
    </div>
  );
}

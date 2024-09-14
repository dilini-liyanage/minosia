import FileUploadBar from '@/components/FileUploadBar';

import RegulationReviewDocumentLayout from './regulationReviewDocumentLayout';

export default function RegulationReview() {
  return (
    <div>
      <div className="h-full">
        <FileUploadBar />
        <RegulationReviewDocumentLayout />
      </div>
    </div>
  );
}

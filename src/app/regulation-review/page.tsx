import FileUploadBar from './FileUploadBar';
import RegulationReviewDocumentLayout from './regulationReviewDocumentLayout';

export default function RegulationReview() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <FileUploadBar />
      <div className="flex-1 overflow-hidden mt-4 ">
        <RegulationReviewDocumentLayout />
      </div>
    </div>
  );
}

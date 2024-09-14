'use client';
import React, { useState, useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createRoot } from 'react-dom/client';

const RegulationReviewDocumentLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<React.ReactNode[][]>([]);

  const sampleContent = [
    <div key="intro" className="text-base font-bold border-b mb-2">
      Introduction to TLV Reimbursement Dossier
    </div>,
    <p key="p1 mb-2" className="text-sm">
      This is the introduction section of the TLV reimbursement dossier. The
      purpose of this document is to demonstrate the structure and thoroughness
      of a reimbursement claim under the TLV (Tandvårds- och
      läkemedelsförmånsverket) guidelines. This page outlines the objectives of
      the dossier, including the scope of the reimbursement claim, patient
      details, medical services provided, and the financial breakdown of the
      claim. In addition, this document highlights the AI-driven analysis that
      will ensure accuracy and compliance with TLV&apos;s complex reimbursement
      process.
      <br />
      The introduction provides a high-level overview of the content in the
      following pages, including an assessment of compliance with TLV&apos;s
      regulatory requirements, the supporting documents attached to each claim,
      and potential areas of improvement identified by the AI. It is essential
      that the introduction sets the tone for the rest of the dossier by clearly
      articulating the scope and purpose of the claims made in this
      reimbursement request. Special attention should be paid to whether the
      introduction sufficiently addresses the TLV requirements for reimbursement
      eligibility, such as patient treatment justification, cost transparency,
      and adherence to legal and ethical standards.
      <br />
      In this dossier, our AI tool will identify key areas such as the quality
      of documentation, alignment with TLV guidelines, potential gaps in
      compliance, and actionable recommendations to strengthen the claim. The AI
      will ensure that the dossier meets the high standards required by TLV for
      successful reimbursement approval. The following sections will delve
      deeper into the specific claims, their justifications, and the supporting
      documents that accompany each claim. Each page has been carefully curated
      to guide the reviewer through the reimbursement process in a structured,
      compliant, and transparent manner.
    </p>,
    <p key="p2" className="text-sm">
      1. This is the introduction section of the TLV reimbursement dossier. The
      purpose of this document is to demonstrate the structure and thoroughness
      of a reimbursement claim under the TLV (Tandvårds- och
      läkemedelsförmånsverket) guidelines. This page outlines the objectives of
      the dossier, including the scope of the reimbursement claim, patient
      details, medical services provided, and the financial breakdown of the
      claim. In addition, this document highlights the AI-driven analysis that
      will ensure accuracy and compliance with TLV&apos;s complex reimbursement
      process.
      <br />
      The introduction provides a high-level overview of the content in the
      following pages, including an assessment of compliance with TLV&apos;s
      regulatory requirements, the supporting documents attached to each claim,
      and potential areas of improvement identified by the AI. It is essential
      that the introduction sets the tone for the rest of the dossier by clearly
      articulating the scope and purpose of the claims made in this
      reimbursement request. Special attention should be paid to whether the
      introduction sufficiently addresses the TLV requirements for reimbursement
      eligibility, such as patient treatment justification, cost transparency,
      and adherence to legal and ethical standards.
      <br />
      In this dossier, our AI tool will identify key areas such as the quality
      of documentation, alignment with TLV guidelines, potential gaps in
      compliance, and actionable recommendations to strengthen the claim. The AI
      will ensure that the dossier meets the high standards required by TLV for
      successful reimbursement approval. The following sections will delve
      deeper into the specific claims, their justifications, and the supporting
      documents that accompany each claim. Each page has been carefully curated
      to guide the reviewer through the reimbursement process in a structured,
      compliant, and transparent manner.
    </p>,
  ];

  useEffect(() => {
    const measureElement = async (
      element: React.ReactNode
    ): Promise<number> => {
      return new Promise((resolve) => {
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.width = `${contentRef.current!.clientWidth}px`;
        document.body.appendChild(tempDiv);

        const root = createRoot(tempDiv);
        root.render(element as React.ReactElement);

        setTimeout(() => {
          const height = tempDiv.clientHeight;
          document.body.removeChild(tempDiv);
          root.unmount();
          resolve(height);
        }, 0);
      });
    };

    const splitElement = async (
      element: React.ReactNode,
      maxHeight: number
    ): Promise<React.ReactNode[]> => {
      if (React.isValidElement(element) && element.props.children) {
        const children = React.Children.toArray(element.props.children);
        const parts: React.ReactNode[] = [];
        let currentPart: React.ReactNode[] = [];

        for (const child of children) {
          const clone = React.cloneElement(element, {}, [
            ...currentPart,
            child,
          ]);
          if (
            (await measureElement(clone)) > maxHeight &&
            currentPart.length > 0
          ) {
            parts.push(React.cloneElement(element, {}, currentPart));
            currentPart = [child];
          } else {
            currentPart.push(child);
          }
        }

        if (currentPart.length > 0) {
          parts.push(React.cloneElement(element, {}, currentPart));
        }

        return parts;
      }

      return [element];
    };

    const processElements = async () => {
      if (contentRef.current) {
        const viewportHeight = contentRef.current.clientHeight;
        const pages: React.ReactNode[][] = [];
        let currentPage: React.ReactNode[] = [];
        let currentHeight = 0;

        for (const element of sampleContent) {
          const elementHeight = await measureElement(element);

          if (currentHeight + elementHeight > viewportHeight) {
            if (currentPage.length > 0) {
              pages.push(currentPage);
              currentPage = [];
              currentHeight = 0;
            }

            if (elementHeight > viewportHeight) {
              const parts = await splitElement(element, viewportHeight);
              for (const part of parts) {
                pages.push([part]);
              }
            } else {
              currentPage.push(element);
              currentHeight = elementHeight;
            }
          } else {
            currentPage.push(element);
            currentHeight += elementHeight;
          }
        }

        if (currentPage.length > 0) {
          pages.push(currentPage);
        }

        setContent(pages);
        setTotalPages(pages.length);
      }
    };

    processElements();
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="h-full mt-4">
      <div className="grid grid-cols-7 gap-4">
        {/* Left side - Reimbursement Document */}
        <div className="col-span-4 bg-white p-3 rounded-lg border">
          <div className="text-base font-semibold border-b mb-3">
            Reimbursement Document
          </div>
          <div className="grid grid-cols-3 gap-3 h-[73vh]">
            <div className="col-span-2 border rounded-lg p-2 overflow-hidden text-sm">
              <div ref={contentRef} className="h-full overflow-hidden">
                {content[currentPage - 1]?.map((element, index) => (
                  <React.Fragment key={index}>{element}</React.Fragment>
                ))}
              </div>
            </div>
            <div className="col-span-1 space-y-3">
              <div className="border bg-[#F9F9FB] rounded-lg p-2">
                <div className="flex items-center justify-between space-x-2">
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="p-1 rounded-full bg-black text-white"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      className="p-1 rounded-full bg-black text-white"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="border bg-[#F9F9FB] rounded-lg p-2">
                <div className="text-base font-semibold mb-3">Highlights</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Analysis Results */}
        <div className="col-span-3 bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-bold mb-4">
            Analysis Results for UK NICE Health Technology Evaluation
          </h2>
          {/* <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Completed TLV submission form with all required fields filled</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Clinical data validation against original study outcomes</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Correct comparator selection verified</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Cost-utility analysis reviewed for consistency and accuracy</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Checking Cost-Effectiveness</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-6 mb-2">Analysis Report</h3>
          <p className="mb-4">The document partially complies with TLV regulations. While it meets most requirements, there are areas that need attention to ensure full compliance.</p>
          
          <h3 className="text-lg font-semibold mb-2">Compliance Checklist</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Completed TLV submission form with all required fields filled</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Clinical data validation against original study outcomes</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Correct comparator selection verified</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Cost-utility analysis reviewed for consistency and accuracy</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Checking Cost-Effectiveness</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-6 mb-2">Recommended Actions</h3>
          <ol className="list-decimal pl-5">
            <li className="mb-2">Re-Evaluate the Cost-Utility Analysis</li>
            <li className="mb-2">Correct and Validate the Cost-Effectiveness Analysis</li>
            <li>Review and Resolve the Warning on Comparator Selection</li>
          </ol> */}
        </div>
      </div>
    </div>
  );
};

export default RegulationReviewDocumentLayout;

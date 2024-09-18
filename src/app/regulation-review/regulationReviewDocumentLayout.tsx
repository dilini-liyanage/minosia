'use client';
import React, { useState, useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { createRoot } from 'react-dom/client';

import AnalysisReport from './AnalysisReport';
import AnalysisResults from './AnalysisResults';

type HighlightWord =
  | 'tlv'
  | 'introduction section'
  | 'AI-driven analysis'
  | 'purpose'
  | 'thoroughness'
  | 'articulating';

const highlightColors: Record<HighlightWord, string> = {
  tlv: 'bg-blue-200',
  'introduction section': 'bg-green-200',
  'AI-driven analysis': 'bg-yellow-200',
  purpose: 'bg-red-200',
  thoroughness: 'bg-purple-200',
  articulating: 'bg-pink-200',
};

const RegulationReviewDocumentLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<React.ReactNode[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const highlightWords: Record<HighlightWord, string> = {
    tlv: 'Tandvårds- och läkemedelsförmånsverket, the Swedish Dental and Pharmaceutical Benefits Agency',
    'introduction section':
      "This is correct. The introduction provides a clear and concise overview of the dossier's objectives and scope.",
    'AI-driven analysis':
      'Potential privacy concern. Verify that sensitive patient data is anonymized or securely handled in compliance with GDPR.',
    purpose:
      'Potential privacy concern. Verify that sensitive patient data is anonymized or securely handled in compliance with GDPR.',
    thoroughness:
      'This is correct. The dossier demonstrates thoroughness in documenting the patient treatment and financial breakdown',
    articulating:
      'This is correct. The introduction clearly articulates the scope and objectives of the reimbursement claim.',
  };

  const highlightText = (text: string) => {
    let result: React.ReactNode[] = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      let earliestMatch: { phrase: HighlightWord; index: number } | null = null;

      for (const phrase of Object.keys(highlightWords) as HighlightWord[]) {
        const index = remainingText.toLowerCase().indexOf(phrase.toLowerCase());
        if (index !== -1 && (!earliestMatch || index < earliestMatch.index)) {
          earliestMatch = { phrase, index };
        }
      }

      if (earliestMatch) {
        if (earliestMatch.index > 0) {
          result.push(remainingText.slice(0, earliestMatch.index));
        }
        const matchedText = remainingText.slice(
          earliestMatch.index,
          earliestMatch.index + earliestMatch.phrase.length
        );
        result.push(
          <span
            key={result.length}
            className={`${highlightColors[earliestMatch.phrase]} cursor-pointer`}
          >
            {matchedText}
          </span>
        );
        remainingText = remainingText.slice(
          earliestMatch.index + earliestMatch.phrase.length
        );
      } else {
        result.push(remainingText);
        break;
      }
    }

    return result;
  };

  const sampleContent = [
    <div key="intro" className="text-base font-bold border-b mb-2">
      Introduction to TLV Reimbursement Dossier
    </div>,
    <p key="p1 mb-2" className="text-sm font-normal">
      {highlightText(`This is the introduction section of the TLV reimbursement dossier. The
      purpose of this document is to demonstrate the structure and thoroughness
      of a reimbursement claim under the TLV (Tandvårds- och
      läkemedelsförmånsverket) guidelines. This page outlines the objectives of
      the dossier, including the scope of the reimbursement claim, patient
      details, medical services provided, and the financial breakdown of the
      claim. In addition, this document highlights the AI-driven analysis that
      will ensure accuracy and compliance with TLV's complex reimbursement
      process.`)}
      <br />
      {highlightText(`The introduction provides a high-level overview of the content in the
      following pages, including an assessment of compliance with TLV's
      regulatory requirements, the supporting documents attached to each claim,
      and potential areas of improvement identified by the AI. It is essential
      that the introduction sets the tone for the rest of the dossier by clearly
      articulating the scope and purpose of the claims made in this
      reimbursement request. Special attention should be paid to whether the
      introduction sufficiently addresses the TLV requirements for reimbursement
      eligibility, such as patient treatment justification, cost transparency,
      and adherence to legal and ethical standards.`)}
      <br />
      {highlightText(`In this dossier, our AI tool will identify key areas such as the quality
      of documentation, alignment with TLV guidelines, potential gaps in
      compliance, and actionable recommendations to strengthen the claim. The AI
      will ensure that the dossier meets the high standards required by TLV for
      successful reimbursement approval. The following sections will delve
      deeper into the specific claims, their justifications, and the supporting
      documents that accompany each claim. Each page has been carefully curated
      to guide the reviewer through the reimbursement process in a structured,
      compliant, and transparent manner.`)}
    </p>,
    <p key="p2" className="text-sm font-normal">
      {highlightText(`1. This is the introduction section of the TLV reimbursement dossier. The
      purpose of this document is to demonstrate the structure and thoroughness
      of a reimbursement claim under the TLV (Tandvårds- och
      läkemedelsförmånsverket) guidelines. This page outlines the objectives of
      the dossier, including the scope of the reimbursement claim, patient
      details, medical services provided, and the financial breakdown of the
      claim. In addition, this document highlights the AI-driven analysis that
      will ensure accuracy and compliance with TLV's complex reimbursement
      process.`)}
      <br />
      {highlightText(`The introduction provides a high-level overview of the content in the
      following pages, including an assessment of compliance with TLV's
      regulatory requirements, the supporting documents attached to each claim,
      and potential areas of improvement identified by the AI. It is essential
      that the introduction sets the tone for the rest of the dossier by clearly
      articulating the scope and purpose of the claims made in this
      reimbursement request. Special attention should be paid to whether the
      introduction sufficiently addresses the TLV requirements for reimbursement
      eligibility, such as patient treatment justification, cost transparency,
      and adherence to legal and ethical standards.`)}
      <br />
      {highlightText(`In this dossier, our AI tool will identify key areas such as the quality
      of documentation, alignment with TLV guidelines, potential gaps in
      compliance, and actionable recommendations to strengthen the claim. The AI
      will ensure that the dossier meets the high standards required by TLV for
      successful reimbursement approval. The following sections will delve
      deeper into the specific claims, their justifications, and the supporting
      documents that accompany each claim. Each page has been carefully curated
      to guide the reviewer through the reimbursement process in a structured,
      compliant, and transparent manner.`)}
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

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-7 gap-4 overflow-hidden">
        {/* Left side - Reimbursement Document */}
        <div className="col-span-4 bg-white p-3 rounded-lg border flex flex-col overflow-hidden">
          <div className="text-sm font-semibold border-b mb-3">
            Reimbursement Document
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3 overflow-hidden">
            <div className="col-span-2 border rounded-lg p-2 overflow-hidden flex flex-col">
              <div ref={contentRef} className="flex-1 overflow-auto text-sm">
                {content[currentPage - 1]?.map((element, index) => (
                  <React.Fragment key={index}>{element}</React.Fragment>
                ))}
              </div>
            </div>
            <div className="col-span-1 flex flex-col space-y-3 overflow-hidden">
              <div className="border bg-[#F9F9FB] rounded-lg p-2">
                <div className="flex items-center justify-between space-x-2">
                  <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="p-1 rounded-full bg-black text-white"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      className="p-1 rounded-full bg-black text-white"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="border bg-[#F9F9FB] flex-1 overflow-y-auto rounded-lg p-2">
                <div className="text-base font-semibold mb-3 border-b pb-1">
                  Highlights
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading highlights...</span>
                  </div>
                ) : (
                  Object.entries(highlightWords).map(([word, definition]) => (
                    <div key={word} className="mb-3 border-b pb-1">
                      <div className="flex gap-2 items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${highlightColors[word as HighlightWord]}`}
                        ></div>
                        <div className="font-semibold text-sm">{word}: </div>
                      </div>
                      <div className="text-sm">{definition}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Analysis Results */}
        <div className="col-span-3 space-y-4 overflow-y-auto bg-white">
          <div>
            <AnalysisResults />
          </div>
          <div>
            <AnalysisReport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulationReviewDocumentLayout;

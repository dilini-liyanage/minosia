'use client';
import React, { useState, useEffect } from 'react';

import { ChevronUp, ChevronDown } from 'lucide-react';

interface AnalysisItemProps {
  title: string;
  status: string;
  details: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const AnalysisItem: React.FC<AnalysisItemProps> = ({
  title,
  status,
  details,
  isExpanded,
  onToggle,
}) => (
  <div className="mb-2 bg-[#F9F9FB] rounded-lg overflow-hidden">
    <button
      className="w-full flex justify-between items-center cursor-pointer text-left p-3"
      onClick={onToggle}
      aria-expanded={isExpanded}
    >
      <span className="font-medium">{title}</span>
      <div className="flex items-center">
        <span
          className={`mr-2 px-3 py-1 text-sm rounded-full ${
            status === 'Partially Complies With'
              ? 'bg-green-100 text-green-800'
              : status === 'Does Not Comply With'
                ? 'bg-red-100 text-red-800'
                : ''
          }`}
        >
          {status}
        </span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </button>
    {isExpanded && (
      <div className="p-3 bg-gray-50 text-sm text-gray-700">{details}</div>
    )}
  </div>
);

const LoadingIcon: React.FC = () => (
  <div className="w-5 h-6 flex items-end space-x-0.5">
    <div className="w-1.5 h-2 mb-1 bg-[#5664D2] rounded-full animate-pulse"></div>
    <div className="w-1.5 h-4 bg-[#5664D2] rounded-full animate-pulse"></div>
    <div className="w-1.5 h-4 mb-2 bg-[#5664D2] rounded-full animate-pulse"></div>
    <div className="w-1.5 h-2 mb-3 bg-[#5664D2] rounded-full animate-pulse"></div>
  </div>
);

interface AnalysisDataItem {
  title: string;
  status: string;
  details: string;
}

const AnalysisResults: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [analysisData, setAnalysisData] = useState<AnalysisDataItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setAnalysisData([
        {
          title:
            'Completed TLV submission form with all required fields filled',
          status: 'Partially Complies With',
          details:
            'Analyzing "Completed TLV submission form with all required fields filled" for Sweden TLV Submission submission of document "Scope of work_Quantum_Hackathon_Website_Brief.pdf". Based on the analysis, this aspect partially complies with',
        },
        {
          title: 'Clinical data validation against original study outcomes',
          status: 'Does Not Comply With',
          details:
            'The clinical data provided does not fully align with the original study outcomes. Further validation and clarification are required.',
        },
        {
          title: 'Correct comparator selection verified',
          status: 'Partially Complies With',
          details:
            'The comparator selection is partially correct, but some adjustments may be needed to fully comply with TLV guidelines.',
        },
        {
          title: 'Cost-utility analysis reviewed for consistency and accuracy',
          status: 'Does Not Comply With',
          details:
            'The cost-utility analysis contains inconsistencies and inaccuracies that need to be addressed to meet TLV standards.',
        },
        {
          title: 'Checking Cost-Effectiveness',
          status: 'Partially Complies With',
          details:
            'The cost-effectiveness analysis partially meets the requirements, but some areas need improvement for full compliance.',
        },
      ]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white p-3 rounded-lg border">
      <h2 className="text-base font-semibold border-b mb-3">
        Analysis Results for UK NICE Health Technology Evaluation
      </h2>
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <LoadingIcon />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm flex flex-col">
          {analysisData.map((item, index) => (
            <AnalysisItem
              key={index}
              title={item.title}
              status={item.status}
              details={item.details}
              isExpanded={expandedItems[index]}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;

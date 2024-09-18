'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';

interface AnalysisSummary {
  score: number;
  text: string;
}

interface ChecklistItem {
  title: string;
  status: 'compliant' | 'non-compliant' | 'warning';
}

interface RecommendedAction {
  id: number;
  text: string;
}

interface AnalysisData {
  summary: AnalysisSummary;
  checklist: ChecklistItem[];
  recommendedActions: RecommendedAction[];
}

const LoadingIcon: React.FC = () => (
  <div className="w-5 h-6 flex items-end space-x-0.5">
    <div className="w-1.5 h-2 mb-1 bg-[#5664D2] rounded-full animate-pulse"></div>
    <div className="w-1.5 h-4 bg-[#5664D2] rounded-full animate-pulse"></div>
    <div className="w-1.5 h-4 mb-2 bg-[#5664D2] rounded-full animate-pulse"></div>
    <div className="w-1.5 h-2 mb-3 bg-[#5664D2] rounded-full animate-pulse"></div>
  </div>
);

const StatusIcon: React.FC<{ status: ChecklistItem['status'] }> = ({
  status,
}) => {
  switch (status) {
    case 'compliant':
      return (
        <Image
          src="/icons/compliant.svg"
          alt="profile-frame"
          width={24}
          height={24}
          className="mr-3"
        />
      );
    case 'non-compliant':
      return (
        <Image
          src="/icons/non-compliant.svg"
          alt="profile-frame"
          width={24}
          height={24}
          className="mr-3"
        />
      );
    case 'warning':
      return (
        <Image
          src="/icons/warning.svg"
          alt="profile-frame"
          width={24}
          height={24}
          className="mr-3"
        />
      );
  }
};

const AnalysisReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const data: AnalysisData = {
        summary: {
          score: 75,
          text: 'The document partially complies with TLV regulations. While it meets most requirements, there are areas that need attention to ensure full compliance.',
        },
        checklist: [
          {
            title:
              'Completed TLV submission form with all required fields filled',
            status: 'compliant',
          },
          {
            title: 'Clinical data validation against original study outcomes',
            status: 'non-compliant',
          },
          { title: 'Correct comparator selection verified', status: 'warning' },
          {
            title:
              'Cost-utility analysis reviewed for consistency and accuracy',
            status: 'non-compliant',
          },
          { title: 'Checking Cost-Effectiveness', status: 'compliant' },
        ],
        recommendedActions: [
          { id: 1, text: 'Re-Evaluate the Cost-Utility Analysis' },
          {
            id: 2,
            text: 'Correct and Validate the Cost-Effectiveness Analysis',
          },
          {
            id: 3,
            text: 'Review and Resolve the Warning on Comparator Selection',
          },
        ],
      };

      setAnalysisData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white border p-3 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold mb-3">Analysis Report</h2>
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <LoadingIcon />
            </div>
          ))}
        </div>
      ) : analysisData ? (
        <>
          <div className="flex justify-between items-center text-sm mb-4 border-b pb-2">
            <p className="text-[#4A4A4A] text-sm font-normal">
              {analysisData.summary.text}
            </p>
            <span className="bg-[#5664D2] text-white px-3 py-3 text-center rounded-lg w-48">
              Score: {analysisData.summary.score}/100
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Compliance Checklist</h3>
            <ul className="space-y-2 mb-4 border-b pb-2">
              {analysisData.checklist.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <StatusIcon status={item.status} />
                </li>
              ))}
            </ul>
          </div>
          <h3 className="font-semibold text-sm mb-2">Recommended Actions</h3>
          <ol className="list-decimal text-sm list-inside space-y-2">
            {analysisData.recommendedActions.map((action, index) => (
              <li key={index} className="flex">
                <span className="text-sm font-extrabold pe-2 text-[#5664D2]">
                  {action.id}
                </span>
                <span className="text-black text-sm font-medium ms-1">
                  {action.text}
                </span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <div>Error loading data</div>
      )}
    </div>
  );
};

export default AnalysisReport;

import React, { useState, useEffect } from 'react';

import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AnalysisSummary {
  score: number;
  text: string;
}

interface ChecklistItem {
  title: string;
  status: 'compliant' | 'non-compliant' | 'warning';
}

interface RecommendedAction {
  text: string;
}

interface AnalysisData {
  summary: AnalysisSummary;
  checklist: ChecklistItem[];
  recommendedActions: RecommendedAction[];
}

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2 animate-pulse">
    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
  </div>
);

const StatusIcon: React.FC<{ status: ChecklistItem['status'] }> = ({
  status,
}) => {
  switch (status) {
    case 'compliant':
      return <CheckCircle className="text-green-500" />;
    case 'non-compliant':
      return <XCircle className="text-red-500" />;
    case 'warning':
      return <AlertCircle className="text-yellow-500" />;
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
          { text: 'Re-Evaluate the Cost-Utility Analysis' },
          { text: 'Correct and Validate the Cost-Effectiveness Analysis' },
          { text: 'Review and Resolve the Warning on Comparator Selection' },
        ],
      };

      setAnalysisData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <LoadingSpinner />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return <div>Error loading analysis data.</div>;
  }

  return (
    <div className="bg-white border p-3 rounded-lg shadow-md">
      <h2 className="text-base font-semibold mb-4">Analysis Report</h2>
      <div className="flex justify-between items-center text-sm mb-4 border-b pb-2">
        <p className="text-gray-600">{analysisData.summary.text}</p>
        <span className="bg-blue-500 text-white px-3 py-2 text-center rounded-lg w-56">
          Score: {analysisData.summary.score}/100
        </span>
      </div>

      <h3 className="font-semibold text-base mb-2">Compliance Checklist</h3>
      <ul className="space-y-2 mb-4 border-b pb-2">
        {analysisData.checklist.map((item, index) => (
          <li
            key={index}
            className="flex items-center text-sm justify-between p-2 bg-gray-50 rounded"
          >
            <span>{item.title}</span>
            <StatusIcon status={item.status} />
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Recommended Actions</h3>
      <ol className="list-decimal text-sm list-inside space-y-2">
        {analysisData.recommendedActions.map((action, index) => (
          <li key={index} className="text-blue-600 bg-[#F9F9FB] py-1">
            <span className="text-black ms-1">{action.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AnalysisReport;

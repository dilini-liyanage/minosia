import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function FeaturesGrid() {
  const features = [
    {
      title: 'Regulatory Approval',
      description:
        'Retrieve information on the approval status of drugs or medical devices across different regions.',
    },
    {
      title: 'Pricing and Reimbursement',
      description:
        'Provide details on the pricing and reimbursement status of drugs in various countries.',
    },
    // Add more features...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardHeader>{feature.title}</CardHeader>
          <CardContent>{feature.description}</CardContent>
        </Card>
      ))}
    </div>
  );
}

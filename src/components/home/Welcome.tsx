import Image from 'next/image';

export function Welcome() {
  return (
    <div className="flex flex-col text-center items-center">
      <Image
        src="/logo/logo-black.svg"
        width={48}
        height={48}
        alt="Picture of the author"
        className="items-center border border-gray-400 border-dashed p-2 rounded-lg"
      />
      <h1 className="text-4xl font-bold bg-custom-text-gradient text-gradient">
        Hello, Maya How can we help you today
      </h1>
      <p className="mt-2 text-gray-600">
        Meet your new competitive advantage. Minosa accelerates success for
        pharmaceutical companies with AI-powered insights. Stay ahead of
        industry trends and focus on bringing life-saving treatments to market
        faster with confidence.
      </p>
    </div>
  );
}

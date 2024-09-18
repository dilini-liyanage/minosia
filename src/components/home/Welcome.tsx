import Image from 'next/image';

export function Welcome() {
  return (
    <div className="flex flex-col text-center items-center">
      <Image
        src="/logo/logo-black.svg"
        width={48}
        height={48}
        alt="Picture of the author"
        className="items-center border border-gray-400 border-dashed p-2 mb-4 rounded-lg"
      />
      <h1 className="text-[40px] font-bold bg-custom-text-gradient mb-3 text-gradient">
        Hello, How can we help you today
      </h1>
      <p className=" text-[#4A4A4A] text-sm">
        Meet your new competitive advantage. Minosa accelerates success for
        pharmaceutical companies with AI-powered insights. Stay ahead of
        industry trends and focus on bringing life-saving treatments to market
        faster with confidence.
      </p>
    </div>
  );
}

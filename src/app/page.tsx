import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { Welcome } from '@/components/home/Welcome';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[90vh]  relative justify-center">
      <div className=" absolute top-10">
        <Welcome />
      </div>
      <div className=" absolute bottom-0 ">
        <SearchBar />
      </div>

      {/* <FeaturesGrid /> */}
    </div>
  );
}

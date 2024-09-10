import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { Welcome } from '@/components/home/Welcome';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <Welcome />
      <FeaturesGrid />
      <SearchBar />
    </div>
  );
}

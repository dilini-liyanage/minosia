import { Welcome } from '@/components/home/Welcome';
import { SearchBar } from '@/components/SearchBar';

export default function Assitant() {
  return (
    <div className="container mx-auto h-full">
      <div className="2xl:mx-48 xl:mx-24 lg:mx-12 mx-0 flex flex-col  h-full">
        <main className="flex-grow flex items-center justify-center px-4">
          <Welcome />
        </main>
        <footer className="p-4">
          <SearchBar />
        </footer>
      </div>
    </div>
  );
}

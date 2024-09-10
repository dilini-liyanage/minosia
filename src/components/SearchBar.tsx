import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="flex mt-8">
      <Input placeholder="Send a message to Minosa" className="flex-1" />
      <Button className="ml-2">Search</Button>
    </div>
  );
}

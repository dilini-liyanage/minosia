import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="flex flex-col">
      <div className="flex py-3 justify-end px-3">
        <UserMenu />
      </div>
      <div className="bg-custom-bg-gradient py-3">nnnn</div>
    </header>
  );
}

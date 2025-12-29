import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
type SearchBarProps = {
  onSearch?: (keyword: string) => void;
  className?: string;
};

function SearchBar({ onSearch, className }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (!keyword.trim()) return;
    onSearch?.(keyword);
  };

  return (
    <div className={`relative max-w-sm ${className}`}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

      <Input
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="pr-9"
      />
    </div>
  );
}

export default SearchBar;

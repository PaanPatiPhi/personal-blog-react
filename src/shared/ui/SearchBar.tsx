import { Input } from "./input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type SearchBarProps = {
  onSearch?: (keyword: string) => void;
  className?: string;
};

function SearchBar({ onSearch, className }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // debounce: รอ 400ms หลังจากหยุดพิมพ์
    const timer = setTimeout(() => {
      const value = keyword.trim();
      console.log("SearchBar -> debounced value:", JSON.stringify(value));
      onSearch?.(value);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword, onSearch]);

  return (
    <div className={`relative max-w-sm ${className}`}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

      <Input
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="pr-9"
      />
    </div>
  );
}

export default SearchBar;

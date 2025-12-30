// CategoryTabs.tsx

// 1. กำหนด Interface สำหรับข้อมูลแต่ละ Option
interface CategoryOption {
  label: string;
  value: string;
}

// 2. กำหนด Interface สำหรับ Props ของ Component
interface CategoryTabsProps {
  options: CategoryOption[];      // เป็น Array ของออบเจกต์ที่มี label และ value
  activeValue: string;            // ค่าที่เลือกอยู่ตอนนี้
  onChange: (value: string) => void; // ฟังก์ชันที่รับค่า string และไม่คืนค่าอะไรกลับมา
  className?: string;             // ? หมายถึงจะมีหรือไม่มีก็ได้
}

function CategoryTabs({ options, activeValue, onChange, className = "" }: CategoryTabsProps) {
  return (
    <div className={`hidden md:flex items-center ${className}`}>
      {options.map((item: CategoryOption) => ( // ระบุ Type ให้ตัวแปร item ใน map
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`px-6 py-2 rounded-xl transition-all duration-300 font-medium text-lg ${
            activeValue === item.value
              ? "bg-(--color-brown-300) text-(--color-brown-600) shadow-sm mx-5"
              : "bg-transparent text-(--color-brown-400) hover:bg-(--color-brown-100) hover:text-(--color-brown-500)"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
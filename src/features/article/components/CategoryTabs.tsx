/**
 * CategoryTabs Component
 * 
 * หน้าที่: แสดงปุ่มเลือก category แบบ tabs (สำหรับ desktop)
 * 
 * การทำงาน:
 * 1. รับ options (array ของ categories) และ activeValue (category ปัจจุบัน)
 * 2. แสดงปุ่มสำหรับแต่ละ category
 * 3. ไฮไลท์ category ที่เลือกอยู่
 * 4. เรียก onChange เมื่อ user คลิก category อื่น
 * 
 * Props:
 * - options: array ของ {label, value} สำหรับแต่ละ category
 * - activeValue: category ปัจจุบันที่เลือก
 * - onChange: ฟังก์ชันที่จะถูกเรียกเมื่อเปลี่ยน category
 * - className: CSS classes เพิ่มเติม (optional)
 */

// ประเภทข้อมูลสำหรับแต่ละ category option
interface CategoryOption {
  label: string;  // ชื่อที่แสดง (เช่น "Cat", "General")
  value: string;  // ค่าที่ส่งไป API (เช่น "Cat", "General")
}

// ประเภทข้อมูลสำหรับ props ของ component
interface CategoryTabsProps {
  options: CategoryOption[];           // Array ของ categories ทั้งหมด
  activeValue: string;                 // Category ที่เลือกอยู่ตอนนี้
  onChange: (value: string) => void;    // ฟังก์ชันเมื่อเปลี่ยน category
  className?: string;                  // CSS classes เพิ่มเติม (optional)
}

function CategoryTabs({ options, activeValue, onChange, className = "" }: CategoryTabsProps) {
  // Debug: ดูว่าได้รับ props อะไร
  console.log("CategoryTabs props:", { options, activeValue, onChange, className });
  
  return (
    <div className={`hidden md:flex items-center ${className}`}>
      {options.map((item: CategoryOption) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`px-6 py-2 rounded-xl transition-all duration-300 font-medium text-lg ${
            activeValue === item.value
              ? "bg-(--color-brown-300) text-(--color-brown-600) shadow-sm" // สถานะ active
              : "bg-transparent text-(--color-brown-400) hover:bg-(--color-brown-100) hover:text-(--color-brown-500)" // สถานะ inactive
          }`}
        >
        {item.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
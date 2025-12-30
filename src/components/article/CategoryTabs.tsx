// CategoryTabs.jsx
function CategoryTabs({ options, activeValue, onChange, className }) { 
  return (
    <div className={`hidden md:flex justify-between ${className}`}>
      {options.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
            className={`px-6 py-2 rounded-xl transition-all duration-300 font-medium text-lg ${
            activeValue === item.value
              ? "bg-(--color-brown-300) text-(--color-brown-600) shadow-sm mx-5" // สีพื้นหลังตอน Active
              : "bg-transparent text-(--color-brown-400) hover:bg-(--color-brown-100) hover:text-(--color-brown-500)" // สีปกติและตอน Hover
          }`}
        >
        
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
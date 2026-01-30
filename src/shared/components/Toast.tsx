type ToastType = "success" | "error" | "info";

type ToastProps = {
  show: boolean;                 // ควบคุมการแสดง toast
  title: string;                 // ข้อความหลัก (ตัวใหญ่)
  description?: string;          // ข้อความอธิบายด้านล่าง (ตัวเล็ก)
  type?: ToastType;              // ประเภท toast
};

export default function Toast({
  show,
  title,
  description,
  type = "success",
}: ToastProps) {
  // ถ้าไม่ให้แสดง → ไม่ render อะไร
  if (!show) return null;

  // map สีตามประเภท toast
  const typeStyles: Record<ToastType, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-gray-800",
  };

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        max-w-sm
        px-4 py-3 rounded-xl
        text-white
        shadow-lg
        ${typeStyles[type]}
        animate-fade-in
      `}
    >
      {/* ข้อความหลัก */}
      <div className="text-sm font-semibold">
        {title}
      </div>

      {/* ข้อความรอง (แสดงเฉพาะเมื่อมีค่า) */}
      {description && (
        <div className="mt-1 text-xs opacity-90">
          {description}
        </div>
      )}
    </div>
  );
}

import React from "react";

/**
 * กำหนด type ของ props สำหรับ Modal
 */
interface ModalProps {
  /** ควบคุมการเปิด/ปิด modal */
  open: boolean;

  /** function ที่ถูกเรียกเมื่อกดปุ่มปิด (×) */
  onClose: () => void;

  /** หัวข้อ modal */
  title?: string;

  /** ข้อความเนื้อหา */
  message?: string;

  /** ข้อความปุ่มซ้าย */
  leftText?: string;

  /** ข้อความปุ่มขวา */
  rightText?: string;

  /** function เมื่อกดปุ่มซ้าย */
  onLeftClick?: () => void;

  /** function เมื่อกดปุ่มขวา */
  onRightClick?: () => void;

  /**
   * กำหนดปุ่มหลัก
   * primary = ปุ่มซ้ายเป็นปุ่มหลัก
   * secondary = ปุ่มขวาเป็นปุ่มหลัก
   */
  type?: "primary" | "secondary";
}

/**
 * class สำหรับปุ่มรอง (สีแดงอ่อน)
 */
const btnSecondary =
  "w-full sm:w-auto px-10 py-3 rounded-full bg-white text-black text-[16px] font-semibold shadow transition cursor-pointer";

/**
 * class สำหรับปุ่มหลัก (สีแดงเข้ม)
 */
const btnPrimary =
  "w-full sm:w-auto px-10 py-3 rounded-full bg-black text-white text-[16px] font-semibold shadow transition cursor-pointer";

/**
 * Modal Component
 *
 * ใช้สำหรับ confirm action เช่น delete / cancel
 */
const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose,
  title = "Title",
  message = "Message",
  leftText = "cancel",
  rightText = "keep",
  onLeftClick,
  onRightClick,
  type = "primary",
}) => {
  /** ถ้า open = false จะไม่ render modal */
  if (!open) return null;

  /**
   * ตรวจว่าปุ่มซ้ายเป็น primary หรือไม่
   */
  const leftIsPrimary = type === "primary";

  /**
   * กำหนด class ของปุ่มซ้าย
   */
  const leftClass = leftIsPrimary ? btnPrimary : btnSecondary;

  /**
   * กำหนด class ของปุ่มขวา
   */
  const rightClass = leftIsPrimary ? btnSecondary : btnPrimary;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/20"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full min-w-0 max-w-[min(100%,32rem)] md:min-w-[528px] md:max-w-[528px] text-card-foreground rounded-2xl shadow-button p-0 border border-border my-auto bg-(--color-brown-200) pt-4 px-6 pb-10">
        {/* Header: title + close button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1 transition hover:bg-red-100 justify-end"
            aria-label="Close"
          >
            <img src="../../src/assets/icon/common/icon-close.svg"
            className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center items-center gap-3 px-4 py-3 font-semibold">
          <div className="text-2xl" data-testid="modal-title">
            {title}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 flex flex-col justify-center items-center gap-6">
          <div className="mb-5 text-[16px] font-medium text-(--color-brown-400)">
            {message}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={onLeftClick}
              className={leftClass}
              autoFocus
            >
              {leftText}
            </button>

            <button type="button" onClick={onRightClick} className={rightClass}>
              {rightText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

/**
 * ArticlePage Component
 * 
 * หน้าที่: หน้าหลักสำหรับแสดงบทความทั้งหมด
 * 
 * การทำงาน:
 * 1. จัดการ state สำหรับ category ที่เลือก
 * 2. แสดง HeroSection, ArticleSearchSection, ArticleSection
 * 3. ส่ง props ให้ components ลูก
 * 
 * การจัดการ state:
 * - category: category ปัจจุบันที่เลือก (default: "Highlight")
 * - handleCategoryChange: ฟังก์ชันสำหรับเปลี่ยน category
 */

import { useState } from "react";
import ArticleSearchSection from "./ArticleSearchSection";
import ArticleSection from "./ArticleSection";
import HeroSection from "@/shared/layout/HeroSection";

function ArticlesPage() {
  // ========== STATE MANAGEMENT ==========
  const [category, setCategory] = useState("Highlight"); // category ปัจจุบันที่เลือก

  // Debug: ดูว่า state เปลี่ยนอย่างไร
  console.log("ArticlePage state:", { category });

  // ========== EVENT HANDLERS ==========
  /**
   * เรียกเมื่อ user เปลี่ยน category tab
   * @param newCategory - category ใหม่ที่เลือก
   */
  const handleCategoryChange = (newCategory: string) => {
    console.log("Category changed from", category, "to", newCategory);
    setCategory(newCategory);
  };

  // ========== RENDER ==========
  return (
    <>
      {/* Hero Section - ส่วนหัวของหน้า */}
      <HeroSection />

      {/* Search & Category Section - ส่วนค้นหาและเลือก category */}
      <ArticleSearchSection
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Articles Display Section - ส่วนแสดงบทความ */}
      <ArticleSection
        category={category}
      />
    </>
  );
}

export default ArticlesPage;

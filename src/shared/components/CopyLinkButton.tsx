import { useState } from "react";
import CopySuccessToast from "@/shared/components/CopySuccessToast";

function CopyLinkButton() {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="text-sm underline hover:text-green-600"
      >
        Copy link
      </button>

      <CopySuccessToast show={showToast} />
    </>
  );
}

export default CopyLinkButton;

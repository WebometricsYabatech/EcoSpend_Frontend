import { useState, useRef, useEffect } from "react";
import { FiInfo } from "react-icons/fi";

/**
 * InfoTip: a small "i" icon that shows a popup explanation.
 * - Desktop: opens on hover or click
 * - Mobile: opens on tap, closes when you tap anywhere else
 * - Keyboard: Tab to focus, Enter/Space to open, Escape to close
 */
export function InfoTip({ title, children, label = "More information" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="ml-1 text-gray-400 hover:text-green-600 focus:outline-none focus:text-green-600"
      >
        <FiInfo size={16} />
      </button>

      {open && (
        <div
          role="tooltip"
          className="absolute left-1/2 top-full z-50 mt-2 w-64 max-w-[80vw] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 text-left text-sm font-normal text-gray-700 shadow-lg"
        >
          {title && <p className="mb-1 font-semibold text-gray-900">{title}</p>}
          {children}
        </div>
      )}
    </span>
  );
}

/** Explains the Eco Score (backend gives 1-10; the UI may show it as a %). */
export function EcoScoreInfo() {
  return (
    <InfoTip title="What is the Eco Score?" label="What is the Eco Score?">
      <p className="mb-2">
        An estimate of how environmentally friendly the items on your receipt
        are. It is scored out of 10 (so 7/10 = 70%).
      </p>
      <ul className="mb-2 space-y-1">
        <li>
          <span className="font-semibold text-green-600">8–10:</span> Very
          sustainable. Mostly local, low-packaging items.
        </li>
        <li>
          <span className="font-semibold text-yellow-600">5–7:</span> Fair. A
          mix of eco-friendly and regular items.
        </li>
        <li>
          <span className="font-semibold text-red-600">1–4:</span> Low. Lots of
          plastic, packaging or imported goods.
        </li>
      </ul>
      <p>
        <span className="font-semibold">To score higher:</span> buy local and
        seasonal, choose less packaging, and skip single-use plastics.
      </p>
      <p className="mt-2 text-xs text-gray-500">
        The score is estimated by AI from your receipt items.
      </p>
    </InfoTip>
  );
}

/** Explains the budget percentage and the colour bands. */
export function BudgetInfo() {
  return (
    <InfoTip title="Budget used" label="What does budget used mean?">
      <p className="mb-2">
        How much of your monthly budget you have already spent.
      </p>
      <ul className="space-y-1">
        <li>
          <span className="font-semibold text-green-600">Green:</span> under
          70%. You are on track.
        </li>
        <li>
          <span className="font-semibold text-yellow-600">Yellow:</span> 70–89%.
          Slow down.
        </li>
        <li>
          <span className="font-semibold text-red-600">Red:</span> 90% or more.
          You are close to or over your limit.
        </li>
      </ul>
    </InfoTip>
  );
}

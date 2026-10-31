import React, { forwardRef, useEffect, type HTMLAttributes } from "react";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  slotProps?: any;
  [key: string]: any;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { open = false, onClose, anchor = "right", className = "", children, ...props },
  ref
) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[1200] flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Slide-over panel */}
      <div
        className={`relative z-10 w-full sm:w-[380px] max-w-full bg-base-100 text-base-content shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-out ${className}`}
        style={{
          paddingTop: "max(24px, env(safe-area-inset-top))",
          paddingBottom: "max(24px, env(safe-area-inset-bottom))",
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});

export default Drawer;

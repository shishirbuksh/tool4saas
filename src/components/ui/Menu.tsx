import React, { forwardRef, useEffect, useRef, type HTMLAttributes } from "react";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  slotProps?: any;
  sx?: any;
  [key: string]: any;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { open = false, anchorEl, onClose, className = "", children, ...props },
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

  const rect = anchorEl?.getBoundingClientRect();
  const top = rect ? rect.bottom + window.scrollY + 8 : 64;
  const left = rect ? Math.min(rect.left + window.scrollX, window.innerWidth - 480) : 16;

  return (
    <div className="fixed inset-0 z-[1100]">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      {/* Menu dropdown box */}
      <div
        ref={ref}
        role="menu"
        className={`absolute z-10 w-[460px] max-w-[calc(100vw-32px)] bg-base-100 text-base-content border border-base-200 rounded-2xl shadow-xl p-3 ${className}`}
        style={{ top: `${top}px`, left: `${Math.max(16, left)}px` }}
        {...props}
      >
        <div className="grid grid-cols-2 gap-1">{children}</div>
      </div>
    </div>
  );
});

export default Menu;

import React, { forwardRef, type HTMLAttributes } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  ref?: any;
  [key: string]: any;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt = "", children, className = "", style, ...props },
  ref
) {
    
  return (
    <div
      ref={ref}
      className={`avatar placeholder inline-flex items-center justify-center rounded-full bg-neutral text-neutral-content font-bold overflow-hidden select-none shrink-0 w-10 h-10 ${className}`}
      style={style}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
});

export default Avatar;

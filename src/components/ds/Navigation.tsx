import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export const AppBar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & { position?: string; elevation?: number; color?: string }>(
  function AppBar({ className = "", style, children, ...props }, ref) {
            return (
      <header
        ref={ref}
        className={`sticky top-0 z-40 bg-base-100/95 backdrop-blur-md border-b border-base-200 transition-colors duration-200 ${className}`}
        style={style}
        {...props}
      >
        {children}
      </header>
    );
  }
);

export const Toolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { disableGutters?: boolean }>(
  function Toolbar({ className = "", style, children, ...props }, ref) {
            return (
      <div ref={ref} className={`flex items-center justify-between min-h-[64px] md:min-h-[72px] w-full ${className}`} style={style} {...props}>
        {children}
      </div>
    );
  }
);

export const List = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement> & { sx?: any }>(
  function List({ className = "", style, children, ...props }, ref) {
            return (
      <ul ref={ref} className={`flex flex-col gap-1 w-full list-none p-0 m-0 ${className}`} style={style} {...props}>
        {children}
      </ul>
    );
  }
);

export const ListItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement> & { disablePadding?: boolean }>(
  function ListItem({ className = "", style, children, ...props }, ref) {
            return (
      <li ref={ref} className={`w-full list-none p-0 m-0 ${className}`} style={style} {...props}>
        {children}
      </li>
    );
  }
);

export const ListItemButton = forwardRef<any, HTMLAttributes<any> & { component?: any; href?: string; selected?: boolean }>(
  function ListItemButton({ component: Comp = "button", href, selected = false, className = "", style, children, ...props }, ref) {
    const activeClass = selected ? "bg-base-200 text-primary font-semibold" : "hover:bg-base-200/60 text-base-content";
        
    return (
      <Comp
        ref={ref}
        href={href}
        className={`flex items-center w-full px-4 py-2.5 rounded-xl text-left transition-colors font-medium text-sm ${activeClass} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

export const ListItemText = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { primary?: ReactNode; secondary?: ReactNode }>(
  function ListItemText({ primary, secondary, className = "", children, ...props }, ref) {
    return (
      <div ref={ref} className={`flex-1 min-w-0 ${className}`} {...props}>
        {primary && <div className="text-sm font-medium">{primary}</div>}
        {children}
        {secondary && <div className="text-xs text-base-content/60 mt-0.5">{secondary}</div>}
      </div>
    );
  }
);

export default {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
};

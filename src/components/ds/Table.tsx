import React, { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";

export const TableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TableContainer(
  { className = "", style, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={`overflow-x-auto rounded-xl border border-base-200 ${className}`} style={style} {...props}>
      {children}
    </div>
  );
});

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(function Table(
  { className = "", style, children, ...props },
  ref
) {
  return (
    <table ref={ref} className={`table table-zebra w-full text-sm ${className}`} style={style} {...props}>
      {children}
    </table>
  );
});

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableHead(
  { className = "", children, ...props },
  ref
) {
  return (
    <thead ref={ref} className={`bg-base-200/70 font-semibold text-base-content ${className}`} {...props}>
      {children}
    </thead>
  );
});

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableBody(
  { className = "", children, ...props },
  ref
) {
  return (
    <tbody ref={ref} className={className} {...props}>
      {children}
    </tbody>
  );
});

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow(
  { className = "", children, ...props },
  ref
) {
  return (
    <tr ref={ref} className={`hover:bg-base-200/40 transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
});

export interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  component?: "th" | "td";
  [key: string]: any;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { align, component, className = "", style, children, ...props },
  ref
) {
  const Component = component || "td";
  const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "";
    
  return (
    <Component ref={ref as any} className={`p-3 ${alignClass} ${className}`} style={style} {...props}>
      {children}
    </Component>
  );
});

export default Table;

import React from 'react';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  onPageChange?: (page: number) => void;
  actions?: React.ReactNode;
  emptyMessage?: string;
}

function DataTable<T extends { id: string }>({
  columns,
  data,
  loading = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  pagination,
  onPageChange,
  actions,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  return (
    <div className="bg-dark-card rounded-2xl border border-neutral-border/20 overflow-hidden">
      {/* Header */}
      {(onSearchChange || actions) && (
        <div className="px-6 py-4 border-b border-neutral-border/20 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {onSearchChange && (
            <div className="relative flex-1 max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-gray"
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-dark border border-neutral-border/30 rounded-xl pl-11 pr-4 py-3 text-white text-sm font-jakarta outline-none focus:border-primary transition-all"
              />
            </div>
          )}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-dark">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-left font-grotesk text-primary text-xs font-bold uppercase tracking-wider ${
                    col.className || ''
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                  <p className="font-jakarta text-neutral-gray mt-2">Loading...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center font-jakarta text-neutral-gray"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-neutral-border/10 hover:bg-dark/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 font-jakarta text-sm ${col.className || ''}`}
                    >
                      {col.render
                        ? col.render(item)
                        : (item as Record<string, unknown>)[col.key]?.toString()}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-neutral-border/20 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="font-jakarta text-neutral-gray text-sm">
            Showing{' '}
            <span className="text-white">
              {(pagination.page - 1) * pagination.limit + 1}
            </span>{' '}
            to{' '}
            <span className="text-white">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{' '}
            of <span className="text-white">{pagination.total}</span> results
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={!pagination.hasPrevPage}
              className="p-2 rounded-lg border border-neutral-border/30 text-neutral-gray hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum: number;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange?.(pageNum)}
                    className={`w-10 h-10 rounded-lg font-jakarta text-sm font-bold transition-all ${
                      pagination.page === pageNum
                        ? 'bg-primary text-dark'
                        : 'text-neutral-gray hover:text-white hover:bg-dark'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={!pagination.hasNextPage}
              className="p-2 rounded-lg border border-neutral-border/30 text-neutral-gray hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;

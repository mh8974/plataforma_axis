import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Button from './Button';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showInfo?: boolean;
  showItemsPerPageSelector?: boolean;
  itemsPerPageOptions?: number[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showInfo = true,
  showItemsPerPageSelector = true,
  itemsPerPageOptions = [10, 25, 50, 100],
  size = 'md',
  className,
  disabled = false
}) => {
  
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  
  const generatePageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = size === 'sm' ? 3 : size === 'md' ? 5 : 7;
    
    if (totalPages <= maxVisiblePages) {
      
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);

      
      if (endPage - startPage + 1 < maxVisiblePages) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        } else {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
      }

      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('ellipsis');
        }
      }

      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('ellipsis');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const buttonSizeMap = {
    sm: 'sm' as const,
    md: 'sm' as const,
    lg: 'md' as const
  };

  if (totalPages <= 1 && !showInfo && !showItemsPerPageSelector) {
    return null;
  }

  return (
    <div className={cn('flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4', className)}>
      {}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {showInfo && (
          <div className={cn('text-neutral-600', sizeClasses[size])}>
            {totalItems === 0 ? (
              'Nenhum item encontrado'
            ) : (
              <>
                Mostrando <span className="font-medium">{startItem}</span> a{' '}
                <span className="font-medium">{endItem}</span> de{' '}
                <span className="font-medium">{totalItems}</span> resultados
              </>
            )}
          </div>
        )}

        {showItemsPerPageSelector && onItemsPerPageChange && (
          <div className={cn('flex items-center gap-2', sizeClasses[size])}>
            <label htmlFor="itemsPerPage" className="text-neutral-600">
              Itens por página:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              disabled={disabled}
              className="px-2 py-1 border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-50 disabled:text-neutral-500"
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {}
          <Button
            variant="ghost"
            size={buttonSizeMap[size]}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1 || disabled}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          {}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <div
                    key={`ellipsis-${index}`}
                    className="px-2 py-2 flex items-center justify-center"
                  >
                    <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                  </div>
                );
              }

              const isCurrentPage = page === currentPage;

              return (
                <Button
                  key={page}
                  variant={isCurrentPage ? 'primary' : 'ghost'}
                  size={buttonSizeMap[size]}
                  onClick={() => onPageChange(page as number)}
                  disabled={disabled}
                  className={cn(
                    'min-w-[2.5rem] justify-center',
                    isCurrentPage && 'pointer-events-none'
                  )}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          {}
          <Button
            variant="ghost"
            size={buttonSizeMap[size]}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || disabled}
            className="flex items-center gap-1"
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
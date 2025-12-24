import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { PaginationData } from '@/types';

interface UsePaginationOptions {
  initialPage?: number;
  initialItemsPerPage?: number;
  totalItems: number;
  updateURL?: boolean;
  pageParam?: string;
  limitParam?: string;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

interface UsePaginationReturn extends PaginationData {
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  offset: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isValidPage: (page: number) => boolean;
  getPageRange: () => { start: number; end: number };
}

export const usePagination = ({
  initialPage = 1,
  initialItemsPerPage = 10,
  totalItems,
  updateURL = true,
  pageParam = 'page',
  limitParam = 'limit',
  onPageChange,
  onItemsPerPageChange
}: UsePaginationOptions): UsePaginationReturn => {
  const router = useRouter();
  
  
  const getInitialPage = (): number => {
    if (!updateURL || typeof window === 'undefined') return initialPage;
    
    const urlPage = Number(router.query[pageParam]);
    return urlPage > 0 ? urlPage : initialPage;
  };

  const getInitialItemsPerPage = (): number => {
    if (!updateURL || typeof window === 'undefined') return initialItemsPerPage;
    
    const urlLimit = Number(router.query[limitParam]);
    return urlLimit > 0 ? urlLimit : initialItemsPerPage;
  };

  const [page, setPageState] = useState<number>(getInitialPage);
  const [limit, setLimitState] = useState<number>(getInitialItemsPerPage);

  
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / limit) || 1;
  }, [totalItems, limit]);

  const offset = useMemo(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const canGoNext = hasNextPage;
  const canGoPrevious = hasPreviousPage;

  
  const isValidPage = (pageNumber: number): boolean => {
    return pageNumber >= 1 && pageNumber <= totalPages;
  };

  
  const getPageRange = () => {
    const start = Math.min(offset + 1, totalItems);
    const end = Math.min(offset + limit, totalItems);
    return { start, end };
  };

  
  useEffect(() => {
    if (!updateURL || !router.isReady) return;

    const currentQuery = { ...router.query };
    
    
    if (page !== initialPage) {
      currentQuery[pageParam] = page.toString();
    } else {
      delete currentQuery[pageParam];
    }

    if (limit !== initialItemsPerPage) {
      currentQuery[limitParam] = limit.toString();
    } else {
      delete currentQuery[limitParam];
    }

    
    router.replace(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [page, limit, router, updateURL, pageParam, limitParam, initialPage, initialItemsPerPage]);

  
  useEffect(() => {
    if (!updateURL || !router.isReady) return;

    const urlPage = Number(router.query[pageParam]) || initialPage;
    const urlLimit = Number(router.query[limitParam]) || initialItemsPerPage;

    if (urlPage !== page) {
      setPageState(urlPage);
    }

    if (urlLimit !== limit) {
      setLimitState(urlLimit);
    }
  }, [router.query, updateURL, pageParam, limitParam, initialPage, initialItemsPerPage]);

  
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  
  const setPage = (newPage: number) => {
    if (!isValidPage(newPage)) return;
    
    setPageState(newPage);
    onPageChange?.(newPage);
  };

  
  const setItemsPerPage = (newItemsPerPage: number) => {
    if (newItemsPerPage <= 0) return;

    setLimitState(newItemsPerPage);
    
    
    const currentOffset = (page - 1) * limit;
    const newPage = Math.max(1, Math.ceil((currentOffset + 1) / newItemsPerPage));
    
    if (newPage !== page) {
      setPageState(newPage);
      onPageChange?.(newPage);
    }
    
    onItemsPerPageChange?.(newItemsPerPage);
  };

  
  const nextPage = () => {
    if (canGoNext) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (canGoPrevious) {
      setPage(page - 1);
    }
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

  return {
    page,
    limit,
    total: totalItems,
    totalPages,
    offset,
    setPage,
    setItemsPerPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    canGoNext,
    canGoPrevious,
    hasNextPage,
    hasPreviousPage,
    isValidPage,
    getPageRange
  };
};


export const useSimplePagination = (
  totalItems: number,
  itemsPerPage: number = 10,
  initialPage: number = 1
) => {
  return usePagination({
    initialPage,
    initialItemsPerPage: itemsPerPage,
    totalItems,
    updateURL: false
  });
};

export default usePagination;
package com.axis.dto;

import java.util.List;


public class PageResponse<T> {
    private List<T> content;
    private int currentPage;
    private int totalPages;
    private long totalItems;
    private int itemsPerPage;

    
    public PageResponse() {}

    public PageResponse(List<T> content, int currentPage, int totalPages, long totalItems, int itemsPerPage) {
        this.content = content;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
    }

    
    public static <T> PageResponse<T> of(List<T> allItems, int page, int size) {
        int totalItems = allItems.size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        
        int currentPage = Math.max(1, Math.min(page, Math.max(1, totalPages)));

        
        int fromIndex = (currentPage - 1) * size;
        int toIndex = Math.min(fromIndex + size, totalItems);

        
        if (fromIndex >= totalItems) {
            fromIndex = 0;
            toIndex = Math.min(size, totalItems);
            currentPage = 1;
        }

        List<T> pageContent = allItems.subList(fromIndex, toIndex);

        return new PageResponse<>(pageContent, currentPage, totalPages, totalItems, size);
    }

    
    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(int itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }
}

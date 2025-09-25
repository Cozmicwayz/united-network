import { useState } from 'react';
import SearchPagination from '../SearchPagination';

export default function SearchPaginationExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for demonstration
  const totalItems = 45;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearchChange = (query: string) => {
    console.log('Search query changed:', query);
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    setCurrentPage(page);
  };

  return (
    <div className="bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Search and Pagination Demo</h2>
        
        <SearchPagination
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
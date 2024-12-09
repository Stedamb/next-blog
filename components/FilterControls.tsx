'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/sanity/types';
import { Author } from '@/sanity/types';
import { getAllCategories, getAllAuthors } from '@/lib/sanity';

interface FilterControlsProps {
  currentCategory?: string;
  currentAuthor?: string;
  currentSort?: string;
}

export function FilterControls({
  currentCategory,
  currentAuthor,
  currentSort,
}: FilterControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchFilters = async () => {
    try {
      const [categoriesData, authorsData] = await Promise.all([
        getAllCategories(),
        getAllAuthors()
      ]);
      setCategories(categoriesData);
      setAuthors(authorsData);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'all') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    // If value is the "all" option, remove the parameter
    if (value === 'all') {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(`/blog${params.toString() ? `?${params.toString()}` : ''}`);
      return;
    }

    const queryString = createQueryString(name, value);
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 px-4 py-4 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-1 sm:contents gap-4">
        <Select
          value={currentCategory || 'all'}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger className="text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories
              .filter(category => category.title)
              .map((category) => (
                <SelectItem 
                  key={category.title} 
                  value={category.title || ''}
                >
                  {category.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          value={currentAuthor || 'all'}
          onValueChange={(value) => handleFilterChange('author', value)}
        >
          <SelectTrigger className="text-white">
            <SelectValue placeholder="Select author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {authors
              .filter(author => author.username)
              .map((author) => (
                <SelectItem 
                  key={author.username} 
                  value={author.username || ''}
                >
                  {author.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <Select
        value={currentSort || 'latest'}
        onValueChange={(value) => handleFilterChange('sort', value)}
      >
        <SelectTrigger className="text-white">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="title">Title A-Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

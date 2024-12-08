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

interface Category {
  title: string;
  slug?: { current: string } | null;
}

interface Author {
  name: string;
  slug?: { current: string } | null;
}

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

  // Fetch categories and authors
  useEffect(() => {
    async function fetchFilters() {
      try {
        const [categoriesRes, authorsRes] = await Promise.all([
          fetch('/api/categories').then(res => res.json()),
          fetch('/api/authors').then(res => res.json())
        ]);
        setCategories(categoriesRes);
        setAuthors(authorsRes);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    }
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
              .filter(category => category.slug?.current)
              .map((category) => (
                <SelectItem 
                  key={category.slug!.current} 
                  value={category.slug!.current}
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
              .filter(author => author.slug?.current)
              .map((author) => (
                <SelectItem 
                  key={author.slug!.current} 
                  value={author.slug!.current}
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

"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectsPaginationProps {
  currentPage: number
  totalPages: number
  total: number
  limit: number
}

export default function ProjectsPagination({ 
  currentPage, 
  totalPages, 
  total, 
  limit 
}: ProjectsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `/projects?${params.toString()}`
  }

  const handlePageChange = (pageNumber: number) => {
    router.push(createPageURL(pageNumber))
  }

  // Calculate start and end item numbers
  const startItem = (currentPage - 1) * limit + 1
  const endItem = Math.min(currentPage * limit, total)

  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages = []
    const showPages = 5 // Show 5 page numbers at most
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    let endPage = Math.min(totalPages, startPage + showPages - 1)
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        แสดง {startItem}-{endItem} จาก {total} โปรเจค
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          ก่อนหน้า
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {/* First page */}
          {getVisiblePages()[0] > 1 && (
            <>
              <Button
                variant={1 === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(1)}
              >
                1
              </Button>
              {getVisiblePages()[0] > 2 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {getVisiblePages().map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(pageNumber)}
              className="min-w-[40px]"
            >
              {pageNumber}
            </Button>
          ))}

          {/* Last page */}
          {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
            <>
              {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}
              <Button
                variant={totalPages === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-2"
        >
          ถัดไป
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

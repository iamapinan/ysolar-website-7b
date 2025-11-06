"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"

interface ProjectsSearchFormProps {
  uniqueLocations: string[]
}

export default function ProjectsSearchForm({ uniqueLocations }: ProjectsSearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [location, setLocation] = useState(searchParams.get("location") || "all")

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (search.trim()) {
      params.set("search", search.trim())
    }
    
    if (location && location !== "all") {
      params.set("location", location)
    }
    
    params.set("page", "1") // Reset to first page
    
    startTransition(() => {
      router.push(`/projects?${params.toString()}`)
    })
  }

  const handleClear = () => {
    setSearch("")
    setLocation("all")
    startTransition(() => {
      router.push("/projects")
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="ค้นหาโปรเจค..."
            className="pl-10 w-full sm:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isPending}
          />
        </div>
        
        {/* Location Filter */}
        <Select value={location} onValueChange={setLocation} disabled={isPending}>
          <SelectTrigger className="w-full sm:w-48 bg-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="เลือกพื้นที่" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">ทุกพื้นที่</SelectItem>
            {uniqueLocations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Action Buttons */}
        <div className="flex gap-0">
          <Button 
            onClick={handleSearch}
            disabled={isPending}
            size="default"
            className="whitespace-nowrap border border-gray-400 hover:border-gray-300 bg-white mt-1"
          >
            {isPending ? "กำลังค้นหา..." : <><Search className="w-4 h-4" /> <span>ค้นหา</span></>}
          </Button>
          
          {(search || location !== "all") && (
            <Button 
              onClick={handleClear}
              disabled={isPending}
              variant="outline"
              size="default"
              className="border border-gray-200 hover:border-gray-300 bg-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

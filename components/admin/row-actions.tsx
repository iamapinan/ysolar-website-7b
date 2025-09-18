"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit, Eye, EyeOff, Trash2 } from "lucide-react"
import Link from "next/link"

type Kind = "services" | "projects" | "articles" | "team"

export function RowActions({ kind, id, isPublished }: { kind: Kind; id: number; isPublished?: boolean }) {
  const [loading, setLoading] = useState(false)

  const togglePublish = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/${kind}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_published: !isPublished }) })
      if (!res.ok) throw new Error("update failed")
      location.reload()
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    if (!confirm("ต้องการลบรายการนี้?")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/${kind}/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error("delete failed")
      location.reload()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" asChild>
        <Link href={`/admin/${kind}/${id}`}><Edit className="w-4 h-4" /></Link>
      </Button>
      {typeof isPublished !== "undefined" && (
        <Button size="sm" variant="outline" onClick={togglePublish} disabled={loading}>
          {isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      )}
      <Button size="sm" variant="outline" className="text-destructive" onClick={remove} disabled={loading}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}



"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<"th" | "en">("th")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "th" ? "en" : "th"))
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2 text-sm">
      <Globe className="h-4 w-4" />
      {language === "th" ? "EN" : "TH"}
    </Button>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Share2, Facebook, MessageCircle, Copy } from "lucide-react"
import { useState } from "react"

interface ShareButtonsProps {
  title: string
  url?: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  // Get current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const handleLineShare = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`
    window.open(lineUrl, '_blank', 'width=600,height=400')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: shareUrl
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback to copy link
      handleCopyLink()
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="sm" onClick={handleNativeShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleFacebookShare}>
        <Facebook className="w-4 h-4 mr-2" />
        Facebook
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleLineShare}>
        <MessageCircle className="w-4 h-4 mr-2" />
        LINE
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleCopyLink}>
        <Copy className="w-4 h-4 mr-2" />
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </div>
  )
}

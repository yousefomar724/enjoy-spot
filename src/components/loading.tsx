"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

export default function Loading() {
  const t = useTranslations("common")
  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden"
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="relative w-32 h-32 mx-auto mb-4"
        >
          <Image
            src="/logo.png"
            alt="Loading..."
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-primary/80"
        >
          {t("loading")}
        </motion.div>
      </div>
    </div>
  )
}

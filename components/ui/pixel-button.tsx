"use client"

import type { ReactNode } from "react"

interface PixelButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
}

export function PixelButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: PixelButtonProps) {
  const baseClasses = "pixel-border pixel-font transition-colors cursor-pointer select-none text-center"

  const variantClasses = {
    primary: "bg-pink-soft hover:bg-yellow-soft",
    secondary: "bg-white hover:bg-pink-soft",
  }

  const sizeClasses = {
    sm: "text-xs p-2",
    md: "text-xs p-3",
    lg: "text-sm p-4",
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

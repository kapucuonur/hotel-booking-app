import * as React from "react"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

interface DialogContentProps {
    children: React.ReactNode
    className?: string
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={() => onOpenChange(false)}
            />
            {children}
        </div>
    )
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
    return (
        <div className={`relative z-50 bg-white dark:bg-zinc-900 rounded-lg shadow-lg max-w-md w-full mx-4 ${className}`}>
            {children}
        </div>
    )
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`px-6 pt-6 ${className}`}>
            {children}
        </div>
    )
}

export function DialogTitle({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={`text-lg font-semibold ${className}`}>
            {children}
        </h2>
    )
}

export function DialogDescription({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <p className={`text-sm text-muted-foreground mt-2 ${className}`}>
            {children}
        </p>
    )
}

export function DialogFooter({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`px-6 pb-6 pt-4 flex gap-3 justify-end ${className}`}>
            {children}
        </div>
    )
}

import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <main className="w-full max-w-md p-8">
        <div className="rounded-xl p-8 glass text-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome back</h1>
          <p className="mb-6 text-sm text-muted">Continue to your dashboard to view your workspace.</p>
          <div className="flex justify-center">
            <Link href="/dashboard" className="rounded-full bg-brand-600 px-6 py-3 text-white font-medium">Continue</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

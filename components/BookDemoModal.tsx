'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface BookDemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BookDemoModal({ open, onOpenChange }: BookDemoModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timezone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          timezone: formData.timezone,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle different error cases
        if (response.status === 400) {
          setError(data.error || 'Please fill in all required fields correctly.')
        } else {
          setError('Something went wrong. Please try again.')
        }
        setLoading(false)
        return
      }

      // Success
      setSubmitted(true)
      toast.success("Demo request submitted successfully! We'll be in touch soon.")

      // Reset form after short delay and close modal
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          timezone: '',
          message: '',
        })
        setSubmitted(false)
        onOpenChange(false)
      }, 2000)
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      toast.error('Failed to submit demo request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        email: '',
        company: '',
        timezone: '',
        message: '',
      })
      setError(null)
      setSubmitted(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-gray-200 bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl" style={{ color: '#1B3358' }}>
            Book a Demo
          </DialogTitle>
          <DialogDescription style={{ color: '#6B7280' }}>
            Let's schedule a personalized demo of Lore. Fill out the form below and we'll get back
            to you shortly.
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" style={{ color: '#1B3358' }}>
                Name <span style={{ color: '#2EAE63' }}>*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-300 bg-white focus:border-gray-400"
                style={{ color: '#2D323C' }}
                placeholder="John Doe"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: '#1B3358' }}>
                Work Email <span style={{ color: '#2EAE63' }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-gray-300 bg-white focus:border-gray-400"
                style={{ color: '#2D323C' }}
                placeholder="john@company.com"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" style={{ color: '#1B3358' }}>
                Company / Team Size{' '}
                <span className="text-sm" style={{ color: '#9CA3AF' }}>
                  (optional)
                </span>
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="border-gray-300 bg-white focus:border-gray-400"
                style={{ color: '#2D323C' }}
                placeholder="Acme Inc. / 50 engineers"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" style={{ color: '#1B3358' }}>
                Preferred Time / Timezone <span style={{ color: '#2EAE63' }}>*</span>
              </Label>
              <Input
                id="timezone"
                required
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="border-gray-300 bg-white focus:border-gray-400"
                style={{ color: '#2D323C' }}
                placeholder="Next week / PST"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" style={{ color: '#1B3358' }}>
                What are you hoping to explore? <span style={{ color: '#2EAE63' }}>*</span>
              </Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[100px] resize-none border-gray-300 bg-white focus:border-gray-400"
                style={{ color: '#2D323C' }}
                placeholder="Tell us about your team's context management challenges..."
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 rounded-full border-gray-300 bg-white hover:bg-gray-50"
                style={{ color: '#2D323C' }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-full text-white transition-all"
                style={{ backgroundColor: '#2EAE63' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4FCB7D')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2EAE63')}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Request Demo
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 py-8 text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: '#2EAE63', opacity: 0.1 }}
            >
              <CheckCircle2 className="h-8 w-8" style={{ color: '#2EAE63' }} />
            </div>
            <h3 className="text-xl font-semibold" style={{ color: '#1B3358' }}>
              Request Submitted!
            </h3>
            <p style={{ color: '#6B7280' }}>
              We've received your demo request. Our team will reach out to you shortly to schedule a
              time.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

import { school } from '@/config/school'

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'demo' }
  | { status: 'error'; message: string }

/**
 * Sends form data to the configured endpoint (CRM / serverless function / school workflow).
 * When no endpoint is configured the form is in DEMONSTRATION MODE: nothing is
 * sent and the UI says so — it never shows a false success message.
 */
export async function submitForm(kind: 'enquiry' | 'contact' | 'visit', payload: Record<string, unknown>): Promise<SubmitResult> {
  const endpoint = kind === 'contact' ? school.integrations.contactEndpoint : school.integrations.enquiryEndpoint
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 700))
    return { status: 'demo' }
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
    })
    if (!res.ok) return { status: 'error', message: `The server responded with ${res.status}. Please try again or contact us directly.` }
    return { status: 'sent' }
  } catch {
    return { status: 'error', message: 'We could not reach the server. Please check your connection or contact us directly.' }
  }
}

export const isDemoMode = (kind: 'enquiry' | 'contact' | 'visit') =>
  !(kind === 'contact' ? school.integrations.contactEndpoint : school.integrations.enquiryEndpoint)

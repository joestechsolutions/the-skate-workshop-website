import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import WaitlistForm from '../components/WaitlistForm'
import ContactPage from '../app/contact/page'
import CoachesPage from '../app/coaches/page'

// Forms rule (2026-11-21): a field is checked when the person leaves it, a shown
// error clears live once fixed, submit is never the only signal, and the phone
// can autofill every personal field.

const EMAIL_ERROR = 'Please enter a valid email address'

// Let react-hook-form's async resolver settle.
const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 0)))

const field = (id: string) => {
  const el = document.getElementById(id)
  if (!el) throw new Error(`no field #${id}`)
  return el as HTMLInputElement
}

const forms = [
  {
    form: 'waitlist',
    mount: () => render(<WaitlistForm />),
    submit: /notify me when we launch/i,
    firstField: 'email',
    attrs: {
      email: { autocomplete: 'email', type: 'email', inputmode: 'email' },
      name: { autocomplete: 'name' },
    },
  },
  {
    form: 'contact',
    mount: () => render(<ContactPage />),
    submit: /send message/i,
    firstField: 'name',
    attrs: {
      name: { autocomplete: 'name' },
      email: { autocomplete: 'email', type: 'email', inputmode: 'email' },
      subject: { autocomplete: 'off' },
    },
  },
  {
    form: 'coaches',
    mount: () => render(<CoachesPage />),
    submit: /send my application/i,
    firstField: 'fullName',
    attrs: {
      fullName: { autocomplete: 'name' },
      email: { autocomplete: 'email', type: 'email', inputmode: 'email' },
      phone: { autocomplete: 'tel', type: 'tel', inputmode: 'tel' },
      yearsExperience: { autocomplete: 'off', inputmode: 'numeric' },
    },
  },
]

describe.each(forms)('$form form', ({ mount, submit, firstField, attrs }) => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows no error while an invalid email is typed and the field is still focused', async () => {
    mount()
    const email = field('email')
    act(() => email.focus())
    fireEvent.change(email, { target: { value: 'skater@' } })
    await settle()

    expect(document.activeElement).toBe(email)
    expect(screen.queryByText(EMAIL_ERROR)).toBeNull()
    expect(email).toHaveAttribute('aria-invalid', 'false')
  })

  it('shows the error on blur, wired to the field, and clears it as soon as the value is fixed', async () => {
    mount()
    const email = field('email')
    act(() => email.focus())
    fireEvent.change(email, { target: { value: 'skater@' } })
    act(() => email.blur())

    const error = await screen.findByText(EMAIL_ERROR)
    expect(error.id).toBe('email-error')
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAttribute('aria-describedby', 'email-error')

    // Fixed while focused, without leaving the field again.
    act(() => email.focus())
    fireEvent.change(email, { target: { value: 'skater@example.com' } })
    await waitFor(() => expect(email).toHaveAttribute('aria-invalid', 'false'))
    expect(email).not.toHaveAttribute('aria-describedby')
    await waitFor(() => expect(screen.queryByText(EMAIL_ERROR)).toBeNull())
  })

  it('keeps submit enabled, and an empty submit focuses the first invalid field', async () => {
    mount()
    const button = screen.getByRole('button', { name: submit })
    expect(button).toBeEnabled()

    fireEvent.click(button)

    await waitFor(() => expect(document.activeElement).toBe(field(firstField)))
    expect(field(firstField)).toHaveAttribute('aria-invalid', 'true')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('lets the phone fill the personal fields', () => {
    mount()
    for (const [id, expected] of Object.entries(attrs)) {
      for (const [attr, value] of Object.entries(expected)) {
        expect(field(id), `#${id} ${attr}`).toHaveAttribute(attr, value)
      }
    }
  })
})

describe('waitlist form', () => {
  it('recognises a valid email with its check mark while the person is still typing', async () => {
    const { container } = render(<WaitlistForm />)
    const email = field('email')
    act(() => email.focus())
    fireEvent.change(email, { target: { value: 'skater@example.com' } })

    await waitFor(() => expect(container.querySelector('.lucide-check')).not.toBeNull())
    expect(document.activeElement).toBe(email)
    expect(screen.queryByText(EMAIL_ERROR)).toBeNull()
  })
})

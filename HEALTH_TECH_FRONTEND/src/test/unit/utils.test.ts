import { describe, it, expect } from 'vitest'
import { cn } from '../../lib/utils'

describe('cn utility', () => {
  it('merges two class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('ignores falsy conditional classes', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
  })

  it('ignores undefined', () => {
    expect(cn('a', undefined, 'b')).toBe('a b')
  })

  it('ignores null', () => {
    expect(cn('a', null, 'b')).toBe('a b')
  })

  it('merges conflicting Tailwind classes (last wins)', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('returns empty string with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('handles object syntax with true value', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
  })

  it('handles array syntax', () => {
    expect(cn(['a', 'b'])).toBe('a b')
  })
})

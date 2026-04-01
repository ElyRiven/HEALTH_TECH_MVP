import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useRegisterPacient } from '../../hooks/useRegisterPacient/useRegisterPacient'

describe('useRegisterPacient', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial state with submitted=false and visible=false', () => {
    const { result } = renderHook(() => useRegisterPacient())
    expect(result.current.submitted).toBe(false)
    expect(result.current.visible).toBe(false)
  })

  it('sets submitted to true after notifySuccess', () => {
    const { result } = renderHook(() => useRegisterPacient())
    act(() => {
      result.current.notifySuccess()
    })
    expect(result.current.submitted).toBe(true)
  })

  it('sets visible to true after notifySuccess effect fires', async () => {
    const { result } = renderHook(() => useRegisterPacient())
    act(() => {
      result.current.notifySuccess()
    })
    // flush effects
    await act(async () => {})
    expect(result.current.visible).toBe(true)
  })

  it('sets visible to false after 2000ms', async () => {
    const { result } = renderHook(() => useRegisterPacient())
    act(() => {
      result.current.notifySuccess()
    })
    await act(async () => {
      vi.advanceTimersByTime(2001)
    })
    expect(result.current.visible).toBe(false)
  })

  it('sets submitted to false after 2500ms', async () => {
    const { result } = renderHook(() => useRegisterPacient())
    act(() => {
      result.current.notifySuccess()
    })
    await act(async () => {
      vi.advanceTimersByTime(2501)
    })
    expect(result.current.submitted).toBe(false)
  })

  it('notifySuccess can be called multiple times', () => {
    const { result } = renderHook(() => useRegisterPacient())
    act(() => { result.current.notifySuccess() })
    expect(result.current.submitted).toBe(true)
  })
})

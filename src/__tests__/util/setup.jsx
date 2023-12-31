import { afterEach, afterAll, beforeAll, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, configure } from '@testing-library/react'
import '@testing-library/jest-dom'
import { server } from './mocks/server'

configure({
  getElementError: (message, container) => {
    const error = new Error(message);
    error.name = 'TestingLibraryElementError';
    error.stack = null;
    return error;
  },
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => {
  server.close()
  vi.restoreAllMocks()
})

afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
  cleanup()
})

export function customRender(
  Component,
  location
) {
  render(
    <MemoryRouter initialEntries={[location]}>
      {Component}
    </MemoryRouter>
  )
}

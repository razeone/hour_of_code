import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Custom render function that wraps components with necessary providers
 * Add any global providers (Context, Redux, etc.) here as needed
 */
function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  // Add providers here if needed in the future
  // const Wrapper = ({ children }: { children: React.ReactNode }) => (
  //   <SomeProvider>{children}</SomeProvider>
  // );

  return {
    user: userEvent.setup(),
    ...render(ui, options),
  };
}

// Re-export everything from testing library
export * from '@testing-library/react';

// Override render with custom render
export { customRender as render };

/**
 * Wait for a condition to be true (useful for async operations)
 */
export async function waitForCondition(
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();
  
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

/**
 * Create a mock function that resolves with data after a delay
 */
export function createDelayedMock<T>(data: T, delay: number = 100): jest.Mock {
  return jest.fn().mockImplementation(
    () => new Promise((resolve) => setTimeout(() => resolve(data), delay))
  );
}

/**
 * Create a mock function that rejects with an error after a delay
 */
export function createErrorMock(error: string, delay: number = 100): jest.Mock {
  return jest.fn().mockImplementation(
    () => new Promise((_, reject) => setTimeout(() => reject(new Error(error)), delay))
  );
}

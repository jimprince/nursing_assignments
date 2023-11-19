import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Neurorehabilitation Nursing Assignment Tool/i);
  expect(headingElement).toBeInTheDocument();
});
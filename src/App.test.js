import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Students Database heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/students database/i);
  expect(linkElement).toBeInTheDocument();
});

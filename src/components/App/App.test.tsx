import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { store } from '../../store/store';

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

describe('Test search', () => {
  test('renders search box', () => {
    render(<App />, { wrapper: Wrapper });

    const linkElement = screen.getByText(/Search/i);

    expect(linkElement).toBeInTheDocument();
  });
});

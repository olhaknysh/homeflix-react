import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Button from './Button';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with a text', () => {
  act(() => {
    render(<Button text='Click' />, container);
  });
  expect(container.textContent).toBe('Click');

  act(() => {
    render(<Button text='Submit' />, container);
  });
  expect(container.textContent).toBe('Submit');
});

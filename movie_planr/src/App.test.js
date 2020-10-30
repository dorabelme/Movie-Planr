import React from "react";
import App from "./App";
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from "react-router-dom";

describe("<App />", () => {

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  })

  it("renders without crashing", () => {
    render(
      <Router>
        <Route component={App} />
      </Router>
    )
  })

  it("renders Movie Route Planr", () => {
    const app = render(
      <Router>
        <Route component={App} />
      </Router>
    )

    app.getByText(/Movie Route Planr/i)
  })

  it("renders Please sign up or login!", () => {
    const app = render(
      <Router>
        <Route component={App} />
      </Router>
    )

    app.getByText(/Please sign up or login!/i)
  })

  it("renders Send button", () => {
    const app = render(
      <Router>
        <Route component={App} />
      </Router>
    )

    app.getByText(/Send/i)
  })
});
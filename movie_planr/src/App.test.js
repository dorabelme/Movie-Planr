import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';

describe("<App />", () => {
  it("renders without crashing", () => {
    // const history = createMemoryHistory()
    render(<App />)
  })
  it("renders Movie Route Planr", () => {
    const app = render(<App />)

    app.getByText(/Movie Route Planr/i)
  })
  it("renders Search button", () => {
    const app = render(<App />)

    app.getAllByText(/Search/i)
  })
  it("renders Search input", () => {
    const app = render(<App />)

    app.getAllByText(/Search for a place/i)
  })
});
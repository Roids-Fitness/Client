import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route } from "react-router-dom";

import Login from "../pages/Login";

describe("Login", () => {
  const mockAPIURL = "http://mockapi.com";

  beforeAll(() => {
    const mock = new MockAdapter(axios);
    // Mock the validateCredentials API endpoint
    mock.onPost(`${mockAPIURL}/user/login`).reply((config) => {
      const { email, password } = JSON.parse(config.data);
      if (email === "test@example.com" && password === "testpassword") {
        return [200, { token: "fake-token", user: { firstName: "John" } }];
      } else {
        return [401, { message: "Invalid credentials" }];
      }
    });
  });

  test("renders login form and handles successful login", async () => {
    render(
      <MemoryRouter initialEntries={["/user/login"]}>
        <Route path="/user/login" component={Login} />
      </MemoryRouter>
    );

    // Check if the login form is displayed
    expect(screen.getByText("Login")).toBeInTheDocument();

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });

    // Click the Login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the login process to complete
    await waitFor(() => {
      // Check if the login successful alert is shown
      expect(window.alert).toHaveBeenCalledWith("Login successful!");

      // Check if the user is redirected to the '/class' route after successful login
      expect(window.location.pathname).toEqual("/class");

      // Check if the user data and token are stored in local storage
      expect(localStorage.getItem("user")).toEqual(JSON.stringify({ firstName: "John" }));
      expect(localStorage.getItem("token")).toEqual("fake-token");
    });
  });

  test("handles invalid credentials during login", async () => {
    render(
      <MemoryRouter initialEntries={["/user/login"]}>
        <Route path="/user/login" component={Login} />
      </MemoryRouter>
    );

    // Check if the login form is displayed
    expect(screen.getByText("Login")).toBeInTheDocument();

    // Fill in the form fields with invalid credentials
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "invalidpassword" },
    });

    // Click the Login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the login process to complete
    await waitFor(() => {
      // Check if the invalid credentials alert is shown
      expect(window.alert).toHaveBeenCalledWith("Invalid credentials. Please try again.");

      // Check if the user is not redirected to the '/class' route after failed login
      expect(window.location.pathname).not.toEqual("/class");

      // Check if the user data and token are not stored in local storage
      expect(localStorage.getItem("user")).toBeNull();
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  test("displays logged-in message when user is already logged in", () => {
    // Mock user and token in local storage
    localStorage.setItem("user", JSON.stringify({ firstName: "John" }));
    localStorage.setItem("token", "fake-token");

    render(
      <MemoryRouter initialEntries={["/user/login"]}>
        <Route path="/user/login" component={Login} />
      </MemoryRouter>
    );

    // Check if the logged-in message is displayed
    expect(screen.getByText("You are currently logged in as John")).toBeInTheDocument();
  });
});

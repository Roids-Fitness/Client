import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route } from "react-router-dom";

import Register from "../pages/Register";

describe("Register", () => {
  const mockAPIURL = "http://mockapi.com";

  beforeAll(() => {
    const mock = new MockAdapter(axios);
    // Mock the user registration API endpoint
    mock.onPost(`${mockAPIURL}/user/register`).reply((config) => {
      const userFormData = JSON.parse(config.data);
      // Mock successful user registration response
      if (userFormData.email === "test@example.com") {
        return [200];
      } else {
        // Mock failed user registration response
        return [400];
      }
    });
  });

  test("renders registration form and handles successful registration", async () => {
    render(
      <MemoryRouter initialEntries={["/user/register"]}>
        <Route path="/user/register" component={Register} />
      </MemoryRouter>
    );

    // Check if the registration form is displayed
    expect(screen.getByText("Registration Form")).toBeInTheDocument();

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: { value: "123 Test Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("Suburb"), {
      target: { value: "Test Suburb" },
    });
    fireEvent.change(screen.getByLabelText("State"), {
      target: { value: "NSW" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postcode"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mobile"), {
      target: { value: "0412345678" },
    });

    // Check the checkbox to agree to terms and conditions
    fireEvent.click(screen.getByLabelText("Agree to terms and conditions"));

    // Click the Sign up button
    fireEvent.click(screen.getByText("Sign up"));

    // Wait for the registration process to complete
    await waitFor(() => {
      // Check if the registration successful alert is shown
      expect(window.alert).toHaveBeenCalledWith("Registration successful!");

      // Check if the user is redirected to the '/user/login' route after successful registration
      expect(window.location.pathname).toEqual("/user/login");
    });
  });

  test("handles failed registration with invalid data", async () => {
    render(
      <MemoryRouter initialEntries={["/user/register"]}>
        <Route path="/user/register" component={Register} />
      </MemoryRouter>
    );

    // Check if the registration form is displayed
    expect(screen.getByText("Registration Form")).toBeInTheDocument();

    // Fill in the form fields with invalid data
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" }, // Password does not meet the pattern requirement
    });

    // Check the checkbox to agree to terms and conditions
    fireEvent.click(screen.getByLabelText("Agree to terms and conditions"));

    // Click the Sign up button
    fireEvent.click(screen.getByText("Sign up"));

    // Wait for the registration process to complete
    await waitFor(() => {
      // Check if the registration failed alert is shown
      expect(window.alert).toHaveBeenCalledWith("Registration failed. Please try again later.");

      // Check if the user is not redirected to the '/user/login' route after failed registration
      expect(window.location.pathname).not.toEqual("/user/login");
    });
  });

  test("displays logged-in message when user is already logged in", () => {
    // Mock user and token in local storage
    localStorage.setItem("user", JSON.stringify({ firstName: "John" }));
    localStorage.setItem("token", "fake-token");

    render(
      <MemoryRouter initialEntries={["/user/register"]}>
        <Route path="/user/register" component={Register} />
      </MemoryRouter>
    );

    // Check if the logged-in message is displayed
    expect(screen.getByText("You are currently logged in as John")).toBeInTheDocument();
  });
});

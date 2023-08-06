import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route } from "react-router-dom";

import ClassDetails from "../pages/ClassDetails";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe("ClassDetails", () => {
  const classDataMock = {
    id: "123",
    title: "Yoga Class",
    description: "A relaxing yoga class for all levels",
    startTime: "2023-08-06T12:00:00Z",
    endTime: "2023-08-06T13:00:00Z",
    trainer: "John Doe",
  };

  const mockAPIURL = "http://mockapi.com";

  beforeAll(() => {
    const mock = new MockAdapter(axios);
    const mockResponse = { data: classDataMock };
    mock.onGet(`${mockAPIURL}/class/${classDataMock.id}`).reply(200, mockResponse);
  });

  test("renders class details when data is available", async () => {
    render(
      <MemoryRouter initialEntries={[`/class/${classDataMock.id}`]}>
        <Route path="/class/:id">
          <ClassDetails />
        </Route>
      </MemoryRouter>
    );

    // Loading message should be displayed before the data is fetched
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to be fetched and the component to be rendered
    await waitFor(() => {
      expect(screen.getByText(classDataMock.title)).toBeInTheDocument();
      expect(screen.getByText(classDataMock.description)).toBeInTheDocument();
      expect(screen.getByText(`Time: Thursday, August 3, 12:00 PM - 1:00 PM`)).toBeInTheDocument();
      expect(screen.getByText(`Trainer: ${classDataMock.trainer}`)).toBeInTheDocument();
    });
  });

  test("calls the handleSignUp function when sign-up button is clicked", async () => {
    const navigateMock = jest.fn();
    const { container } = render(
      <MemoryRouter initialEntries={[`/class/${classDataMock.id}`]}>
        <Route path="/class/:id">
          <ClassDetails />
        </Route>
      </MemoryRouter>
    );

    const signUpButton = container.querySelector(".button");

    // Mock local storage token
    localStorage.setItem("token", "fake-token");

    // Click the sign-up button
    fireEvent.click(signUpButton);

    // Check if handleSignUp function was called
    expect(axios.put).toHaveBeenCalledWith(
      `${mockAPIURL}/class/${classDataMock.id}`,
      {},
      {
        headers: {
          Authorization: "Bearer fake-token",
        },
      }
    );

    // Wait for the alert to show up
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Signup successful! [response-data]");
    });

    // Check if the navigate function was called with the correct path
    expect(navigateMock).toHaveBeenCalledWith("/class");
  });

  test("displays a login alert when sign-up button is clicked without a token", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/class/${classDataMock.id}`]}>
        <Route path="/class/:id">
          <ClassDetails />
        </Route>
      </MemoryRouter>
    );

    const signUpButton = container.querySelector(".button");

    // Remove token from local storage
    localStorage.removeItem("token");

    // Click the sign-up button
    fireEvent.click(signUpButton);

    // Check if the login alert is shown
    expect(window.alert).toHaveBeenCalledWith("Please login to signup!");
  });
});

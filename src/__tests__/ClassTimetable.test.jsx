import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";

import ClassTimetable from "../pages/ClassTimetable";

describe("ClassTimetable", () => {
  const classesMockData = [
    {
      id: "1",
      title: "Yoga Class",
      start: "2023-08-06T12:00:00Z",
      end: "2023-08-06T13:00:00Z",
      participantList: ["user1"],
    },
    {
      id: "2",
      title: "Pilates Class",
      start: "2023-08-07T10:00:00Z",
      end: "2023-08-07T11:00:00Z",
      participantList: [],
    },
    // Add more class mock data as needed
  ];

  const mockAPIURL = "http://mockapi.com";

  beforeAll(() => {
    const mock = new MockAdapter(axios);
    const mockResponse = { data: classesMockData };
    mock.onGet(`${mockAPIURL}/class`).reply(200, mockResponse);
  });

  test("renders class timetable and displays class count for logged-in users", async () => {
    // Mock user and token in local storage
    localStorage.setItem("user", JSON.stringify({ id: "user1" }));
    localStorage.setItem("token", "fake-token");

    render(
      <MemoryRouter>
        <ClassTimetable />
      </MemoryRouter>
    );

    // Loading message should be displayed before the data is fetched
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to be fetched and the component to be rendered
    await waitFor(() => {
      expect(screen.getByText("Class Timetable")).toBeInTheDocument();
      expect(screen.getByText("You have 1 class(es) this week (shown in red).")).toBeInTheDocument();
      expect(screen.getByText("Select on the class the class you are interested in to sign up!")).toBeInTheDocument();
      expect(screen.getByText("What to bring to class")).toBeInTheDocument();
      expect(screen.getByText("Water bottle")).toBeInTheDocument();
      expect(screen.getByText("Towel")).toBeInTheDocument();
      expect(screen.getByText("Comfortable clothing")).toBeInTheDocument();
    });
  });

  test("navigates to class details when an event is clicked", async () => {
    const navigateMock = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ClassTimetable />
      </MemoryRouter>
    );

    // Wait for data to be fetched and the component to be rendered
    await waitFor(() => {
      expect(screen.getByText("Class Timetable")).toBeInTheDocument();
    });

    const eventInCalendar = container.querySelector(".calendar-event");

    // Click on the event in the calendar
    fireEvent.click(eventInCalendar);

    // Check if navigate function was called with the correct path
    expect(navigateMock).toHaveBeenCalledWith("/class/1");
  });
});

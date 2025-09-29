import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../pages/HomePage";
import { MemoryRouter } from "react-router-dom";

// Suppress console warnings during tests
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
  console.log.mockRestore();
});

const setup = () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
};

describe("HomePage Component", () => {
  beforeEach(() => setup());

  // ---------------- HERO SECTION ----------------
  test("renders hero section with title, subtitle, description, and search button", () => {
    expect(screen.getByRole("heading", { level: 1, name: /feast your senses/i })).toBeInTheDocument();
    expect(screen.getByText(/fast and fresh/i)).toBeInTheDocument();
    expect(
      screen.getByText(/order restaurant food, takeaway, and groceries delivered right to your door/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeEnabled();
  });

  test("search input is present, empty by default, and allows typing", async () => {
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText(/enter a postcode to see what we deliver/i);

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("");

    await user.type(searchInput, "Nairobi");
    expect(searchInput.value).toBe("Nairobi");
  });

  test("search button is clickable", async () => {
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText(/enter a postcode to see what we deliver/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    await user.type(searchInput, "Nairobi");
    await user.click(searchButton);

    // Ensure the input value persists
    expect(searchInput.value).toBe("Nairobi");
    expect(searchButton).toBeEnabled();
  });

  // ---------------- ORDER CARDS ----------------
  test("renders order cards with correct titles and descriptions", () => {
    const orderCards = [
      { heading: "Order", text: /we've received your order/i },
      { heading: "Order Accepted", text: /your order will be delivered shortly/i },
      { heading: /Your rider's nearby/i, text: /they're almost there/i },
    ];

    orderCards.forEach(({ heading, text }) => {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  // ---------------- NAVIGATION LINKS ----------------
  test("navigation links are present and clickable", async () => {
    const user = userEvent.setup();
    const menuLink = screen.getByRole("link", { name: /menu/i });
    const adminLink = screen.getByRole("link", { name: /admin/i });

    expect(menuLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();

    await user.click(menuLink);
    await user.click(adminLink);
  });

  // ---------------- ADDITIONAL CHECKS ----------------
  test("renders main sections: FeaturesHighlights and Footer", () => {
    // FeaturesHighlights sections
    expect(screen.getByText(/Up to -40% 🎯 MEALY exclusive deals/i)).toBeInTheDocument();
    expect(screen.getByText(/Popular Restaurants/i)).toBeInTheDocument();
    expect(screen.getByText(/Know more about us/i)).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/MEALY Copyright/i)).toBeInTheDocument();
  });
});

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import MenuPage from "../pages/MenuPage";
import { BrowserRouter } from "react-router-dom";

expect.extend(toHaveNoViolations);

const renderMenuPage = () =>
  render(
    <BrowserRouter>
      <MenuPage />
    </BrowserRouter>
  );

describe("MenuPage Component", () => {
  /** --- HEADER TESTS --- */
  describe("MHeader Component", () => {
    test("renders header with promo message", () => {
      renderMenuPage();
      expect(screen.getByText(/Get 25.00 OFF your first order/i)).toBeInTheDocument();
      expect(screen.getByText(/Promo: ORDER25/i)).toBeInTheDocument();
    });

    test("renders location information", () => {
      renderMenuPage();
      expect(screen.getByText(/Nairobi, Kenya/i)).toBeInTheDocument();
    });

    test("renders navigation links", () => {
      renderMenuPage();
      expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Menu/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Admin/i })).toBeInTheDocument();
    });

    test("renders MEALY logo", () => {
      renderMenuPage();
      const logo = screen.getByText("MEALY", { selector: "span.logo-text" });
      expect(logo).toBeInTheDocument();
    });
  });

  /** --- HERO SECTION TESTS --- */
  describe("MHero Component", () => {
    test("renders hero section with title", () => {
      renderMenuPage();
      expect(screen.getByRole("heading", { name: /READY TO SERVE/i })).toBeInTheDocument();
    });

    test("renders minimum order badge", () => {
      renderMenuPage();
      expect(screen.getByText(/Minimum Order: 12 KSH/i)).toBeInTheDocument();
    });

    test("renders delivery time badge", () => {
      renderMenuPage();
      expect(screen.getByText(/Delivery in 20-25 Minutes/i)).toBeInTheDocument();
    });

    test("renders rating information", () => {
      renderMenuPage();
      const ratingNumber = screen.getAllByText(/3\.4/)[0];
      expect(ratingNumber).toBeInTheDocument();
      expect(screen.getByText(/\(1,345 reviews\)/i)).toBeInTheDocument();
    });

    test("renders order button", () => {
      renderMenuPage();
      expect(screen.getByRole("button", { name: /Order from US/i })).toBeInTheDocument();
    });

    test("renders search input", () => {
      renderMenuPage();
      expect(screen.getByPlaceholderText(/Search from menu/i)).toBeInTheDocument();
    });
  });

  /** --- MENU FEATURES TESTS --- */
  describe("MFeatures Component - Menu Categories", () => {
    test("renders all menu categories", () => {
      renderMenuPage();
      const categories = [
        "Pizzas",
        "Garlic Bread",
        "Calzone",
        "Kebabas",
        "Salads",
        "Cold drinks",
        "Happy Mealy",
        "Desserts",
        "Coffee",
        "Sauces",
        "KUKU"
      ];

      const menuSidebar = screen.getByRole("heading", { name: /Menu/i }).closest("aside");
      categories.forEach(category => {
        expect(within(menuSidebar).getByText(category)).toBeInTheDocument();
      });
    });

    test("Pizzas category is active by default", () => {
      renderMenuPage();
      const menuSidebar = screen.getByRole("heading", { name: /Menu/i }).closest("aside");
      const pizzasItem = within(menuSidebar).getByText("Pizzas");
      expect(pizzasItem).toHaveClass("active");
    });

    test("clicking a category highlights it", async () => {
      renderMenuPage();
      const menuSidebar = screen.getByRole("heading", { name: /Menu/i }).closest("aside");
      const garlicBreadItem = within(menuSidebar).getByText("Garlic Bread");

      await userEvent.click(garlicBreadItem);
      expect(garlicBreadItem).toHaveClass("active");
    });

    test("clicking a category changes displayed menu items", async () => {
      renderMenuPage();
      const menuSidebar = screen.getByRole("heading", { name: /Menu/i }).closest("aside");

      // Initially shows Pizza items
      expect(screen.getByText(/Farmhouse Xtreme Pizza/i)).toBeInTheDocument();

      // Click Garlic Bread category
      const garlicBreadItem = within(menuSidebar).getByText("Garlic Bread");
      await userEvent.click(garlicBreadItem);

      // Should show Garlic Bread items
      expect(screen.getByText(/Classic Garlic Bread/i)).toBeInTheDocument();
      expect(screen.getByText(/Cheese Garlic Bread/i)).toBeInTheDocument();
    });
  });

  /** --- BASKET TESTS --- */
  describe("MFeatures Component - Basket", () => {
    test("renders basket sidebar with header", () => {
      renderMenuPage();
      const basketSidebar = screen.getByRole("heading", { name: /My Basket/i }).closest("aside");
      expect(within(basketSidebar).getByRole("heading", { name: /My Basket/i })).toBeInTheDocument();
    });

    test("renders initial basket items", () => {
      renderMenuPage();
      expect(screen.getByText(/Farmhouse Pizza/i)).toBeInTheDocument();
      expect(screen.getByText(/2x Mushrooms, 1 green peppers/i)).toBeInTheDocument();
    });
  });

  /** --- ACCESSIBILITY TEST --- */
  describe("Accessibility tests with axe", () => {
    test("should have no accessibility violations", async () => {
      const { container } = renderMenuPage();
      // Only check main content to avoid landmark uniqueness errors
      const mainContent = container.querySelector("main");
      const results = await axe(mainContent);
      expect(results).toHaveNoViolations();
    });
  });

  /** --- SNAPSHOT TEST --- */
  test("matches snapshot", () => {
    const { asFragment } = renderMenuPage();
    expect(asFragment()).toMatchSnapshot();
  });
});

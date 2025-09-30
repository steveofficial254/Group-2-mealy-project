import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../pages/HomePage";
import { MemoryRouter } from "react-router-dom";

// Mock image imports to avoid loading issues
jest.mock("../assets/image1.jpg", () => "test-image1.jpg");
jest.mock("../assets/image2.jpg", () => "test-image2.jpg");
jest.mock("../assets/image11.jpg", () => "test-image11.jpg");
jest.mock("../assets/image19.jpg", () => "test-image19.jpg");
jest.mock("../assets/image20.jpg", () => "test-image20.jpg");
jest.mock("../assets/image5.jpg", () => "test-image5.jpg");
jest.mock("../assets/image3.jpg", () => "test-image3.jpg");
jest.mock("../assets/image4.jpg", () => "test-image4.jpg");
jest.mock("../assets/image16.jpg", () => "test-image16.jpg");
jest.mock("../assets/image6.jpg", () => "test-image6.jpg");
jest.mock("../assets/image7.jpg", () => "test-image7.jpg");
jest.mock("../assets/image8.jpg", () => "test-image8.jpg");
jest.mock("../assets/image10.jpg", () => "test-image10.jpg");
jest.mock("../assets/image9.jpg", () => "test-image9.jpg");
jest.mock("../assets/image18.jpg", () => "test-image18.jpg");
jest.mock("../assets/image17.jpg", () => "test-image17.jpg");
jest.mock("../assets/hero.jpg", () => "test-hero.jpg");

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

  // ---------------- HEADER SECTION ----------------
  describe("Header Section", () => {
    test("renders header with promo banner and location", () => {
      expect(screen.getByText(/Get 5% Off your first order, Promo: ORDER5/i)).toBeInTheDocument();
      expect(screen.getByText(/Kimathi Street Nairobi/i)).toBeInTheDocument();
    });

    test("renders logo and navigation links", () => {
      // Use more specific queries to avoid duplicates
      const logoText = screen.getByText(/ENJOY YOUR MEAL!/i);
      expect(logoText).toBeInTheDocument();
      
      const menuLink = screen.getByRole("link", { name: /menu/i });
      const adminLink = screen.getByRole("link", { name: /admin/i });
      
      expect(menuLink).toHaveAttribute("href", "/menu");
      expect(adminLink).toHaveAttribute("href", "/admin");
    });
  });

  // ---------------- HERO SECTION ----------------
  describe("Hero Section", () => {
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

      expect(searchInput.value).toBe("Nairobi");
      expect(searchButton).toBeEnabled();
    });

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
  });

  // ---------------- FEATURES HIGHLIGHTS SECTION ----------------
  describe("FeaturesHighlights Section", () => {
    test("renders deals section with title and category tabs", () => {
      expect(screen.getByText(/Up to -40% 🎯 MEALY exclusive deals/i)).toBeInTheDocument();
      expect(screen.getByText(/Legal Fish/i)).toBeInTheDocument();
      expect(screen.getByText(/Cuisine/i)).toBeInTheDocument();
      expect(screen.getByText(/Pizza & Fast food/i)).toBeInTheDocument();
    });

    test("renders popular categories section", () => {
      expect(screen.getByText(/Mealy Popular Categories 😋/i)).toBeInTheDocument();
      
      const categories = [
        "Kenyan Pilau",
        "Nyama Choma", 
        "Pasta & Casuals",
        "Pizza",
        "Breakfast",
        "Soups"
      ];

      categories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    test("renders popular restaurants section", () => {
      expect(screen.getByText(/Popular Restaurants 🍽️/i)).toBeInTheDocument();
      
      const restaurants = [
        "MAMA KULU",
        "Nairobi Street Kitchen",
        "KFC",
        "ARZ", 
        "Ashoki",
        "JAVA HOUSE"
      ];

      restaurants.forEach(restaurant => {
        expect(screen.getByText(restaurant)).toBeInTheDocument();
      });
    });

    test("renders personalised section", () => {
      expect(screen.getByText(/MEALY is more/i)).toBeInTheDocument();
      expect(screen.getByText(/Personalised & Instant/i)).toBeInTheDocument();
      
      // Check that app store buttons exist (they appear multiple times)
      const googlePlayButtons = screen.getAllByText(/Google Play/i);
      const appStoreButtons = screen.getAllByText(/App Store/i);
      
      expect(googlePlayButtons.length).toBeGreaterThan(0);
      expect(appStoreButtons.length).toBeGreaterThan(0);
    });

    test("renders about section", () => {
      expect(screen.getByText(/Know more about us!/i)).toBeInTheDocument();
      
      // Check FAQ tabs exist
      expect(screen.getAllByText(/Frequent Questions/i).length).toBeGreaterThan(0);
      
      // Check features exist
      expect(screen.getByText(/Place an Order!/i)).toBeInTheDocument();
      expect(screen.getByText(/Track Progress/i)).toBeInTheDocument();
      expect(screen.getByText(/Get your Order!/i)).toBeInTheDocument();
    });
  });

  // ---------------- FOOTER SECTION ----------------
  describe("Footer Section", () => {
    test("renders footer with copyright text", () => {
      expect(screen.getByText(/MEALY Copyright 2024, All Rights Reserved./i)).toBeInTheDocument();
    });

    test("renders newsletter section", () => {
      expect(screen.getByText(/Get Exclusive Deals in your Inbox/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Your email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Subscribe/i)).toBeInTheDocument();
    });

    test("renders legal pages and important links", () => {
      // Use specific text that's unique or check that they exist among multiple
      expect(screen.getByText(/Terms and conditions/i)).toBeInTheDocument();
      expect(screen.getByText(/Modern Slavery Statement/i)).toBeInTheDocument();
      expect(screen.getByText(/Get help/i)).toBeInTheDocument();
      expect(screen.getByText(/Add your restaurant/i)).toBeInTheDocument();
    });
  });

  // ---------------- IMAGE TESTS ----------------
  describe("Image Tests", () => {
    test("hero image has correct alt text", () => {
      const heroImage = screen.getByAltText("Delicious food delivery");
      expect(heroImage).toBeInTheDocument();
    });

    test("deal images have correct alt text", () => {
      expect(screen.getByAltText("Sandwich and salad combo deal")).toBeInTheDocument();
      expect(screen.getByAltText("Various dishes deal")).toBeInTheDocument();
      expect(screen.getByAltText("Burger and fries deal")).toBeInTheDocument();
    });

    test("restaurant logos have correct alt text", () => {
      expect(screen.getByAltText("MAMA KULU logo")).toBeInTheDocument();
      expect(screen.getByAltText("Nairobi Street Kitchen logo")).toBeInTheDocument();
      expect(screen.getByAltText("KFC logo")).toBeInTheDocument();
    });
  });

  // ---------------- INTERACTIVITY TESTS ----------------
  describe("Interactivity Tests", () => {
    test("navigation links are present and clickable", async () => {
      const user = userEvent.setup();
      const menuLink = screen.getByRole("link", { name: /menu/i });
      const adminLink = screen.getByRole("link", { name: /admin/i });

      expect(menuLink).toBeInTheDocument();
      expect(adminLink).toBeInTheDocument();

      await user.click(menuLink);
      await user.click(adminLink);
    });

    test("category tabs are clickable", async () => {
      const user = userEvent.setup();
      const legalFishTab = screen.getByText(/Legal Fish/i);
      const cuisineTab = screen.getByText(/Cuisine/i);
      const pizzaTab = screen.getByText(/Pizza & Fast food/i);

      await user.click(legalFishTab);
      await user.click(cuisineTab);
      await user.click(pizzaTab);

      expect(legalFishTab).toBeInTheDocument();
      expect(cuisineTab).toBeInTheDocument();
      expect(pizzaTab).toBeInTheDocument();
    });

    test("newsletter input accepts text", async () => {
      const user = userEvent.setup();
      const emailInput = screen.getByPlaceholderText(/Your email address/i);

      await user.type(emailInput, "test@example.com");
      expect(emailInput.value).toBe("test@example.com");
    });
  });

  // ---------------- COMPREHENSIVE INTEGRATION TEST ----------------
  describe("Comprehensive Integration", () => {
    test("all main sections are rendered", () => {
      // Check for unique text in each section to verify they're all present
      const uniqueSectionTexts = [
        /Get 5% Off your first order/,
        /Feast Your Senses/,
        /MEALY exclusive deals/, 
        /Mealy Popular Categories 😋/, 
        /Personalised & Instant/, 
        /Know more about us!/, 
        /MEALY Copyright 2024/
      ];

      uniqueSectionTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
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
    // FeaturesHighlights sections - use unique identifiers
    expect(screen.getByText(/Up to -40% 🎯 MEALY exclusive deals/i)).toBeInTheDocument();
    expect(screen.getByText(/Popular Restaurants 🍽️/i)).toBeInTheDocument();
    expect(screen.getByText(/Know more about us!/i)).toBeInTheDocument();

    // Footer - use unique copyright text
    expect(screen.getByText(/MEALY Copyright 2024, All Rights Reserved./i)).toBeInTheDocument();
  });
});

// Additional tests for edge cases
describe("HomePage Additional Tests", () => {
  beforeEach(() => setup());

  test("all images have alt attributes", () => {
    const images = screen.getAllByRole("img");
    
    images.forEach(img => {
      expect(img).toHaveAttribute("alt");
      expect(img.alt).not.toBe("");
    });
  });

  test("external links have security attributes", () => {
    const externalLinks = screen.getAllByRole("link").filter(link => 
      link.href.includes('play.google.com') || link.href.includes('apple.com')
    );

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test("handles long input in search field", async () => {
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText(/enter a postcode to see what we deliver/i);
    const longInput = "A".repeat(50);
    
    await user.type(searchInput, longInput);
    expect(searchInput.value).toBe(longInput);
  });
});
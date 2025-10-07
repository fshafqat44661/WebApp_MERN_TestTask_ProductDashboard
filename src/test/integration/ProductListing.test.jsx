import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils";
import ProductListingPage from "../../pages/ProductListingPage";
import * as api from "../../utils/api";

vi.mock("../../utils/api");

const mockProducts = [
  {
    id: 1,
    title: "Laptop Computer",
    price: 999.99,
    category: "electronics",
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: "Cotton T-Shirt",
    price: 19.99,
    category: "clothing",
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.0, count: 50 },
  },
  {
    id: 3,
    title: "Wireless Mouse",
    price: 29.99,
    category: "electronics",
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.8, count: 200 },
  },
];

const mockCategories = ["electronics", "clothing"];

describe("ProductListing Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.fetchProducts.mockResolvedValue(mockProducts);
    api.fetchCategories.mockResolvedValue(mockCategories);
  });

  it("should load and display products", async () => {
    renderWithProviders(<ProductListingPage />);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
      expect(screen.getByText("Cotton T-Shirt")).toBeInTheDocument();
      expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
    });
  });

  it("should filter products by search query", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search products...");
    await user.type(searchInput, "Laptop");

    await waitFor(
      () => {
        expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
        expect(screen.queryByText("Cotton T-Shirt")).not.toBeInTheDocument();
        expect(screen.queryByText("Wireless Mouse")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should filter products by category", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
    });

    const electronicsButton = screen.getByRole("button", {
      name: /electronics/i,
    });
    await user.click(electronicsButton);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
      expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
      expect(screen.queryByText("Cotton T-Shirt")).not.toBeInTheDocument();
    });
  });

  it("should sort products by price", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
    });

    const sortSelect = screen.getByLabelText("Sort products");
    await user.selectOptions(sortSelect, "price-asc");

    await waitFor(() => {
      const productCards = screen.getAllByRole("link");
      const prices = productCards
        .map((card) => card.textContent.match(/\$(\d+\.\d+)/)?.[1])
        .filter(Boolean)
        .map(Number);

      expect(prices[0]).toBeLessThanOrEqual(prices[1]);
      expect(prices[1]).toBeLessThanOrEqual(prices[2]);
    });
  });

  it("should add and remove products from favorites", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
    });

    const favoriteButtons = screen.getAllByLabelText("Add to favorites");
    await user.click(favoriteButtons[0]);

    await waitFor(() => {
      expect(
        screen.getByLabelText("Remove from favorites")
      ).toBeInTheDocument();
    });

    const removeButton = screen.getByLabelText("Remove from favorites");
    await user.click(removeButton);

    await waitFor(() => {
      expect(
        screen.queryByLabelText("Remove from favorites")
      ).not.toBeInTheDocument();
    });
  });

  it("should combine search and category filters", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search products...");
    await user.type(searchInput, "Computer");

    const electronicsButton = screen.getByRole("button", {
      name: /electronics/i,
    });
    await user.click(electronicsButton);

    await waitFor(
      () => {
        expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
        expect(screen.queryByText("Cotton T-Shirt")).not.toBeInTheDocument();
        expect(screen.queryByText("Wireless Mouse")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should display empty state when no products match filters", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    await waitFor(() => {
      expect(screen.getByText("Laptop Computer")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search products...");
    await user.type(searchInput, "NonexistentProduct");

    await waitFor(
      () => {
        expect(screen.getByText("No Products Found")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});

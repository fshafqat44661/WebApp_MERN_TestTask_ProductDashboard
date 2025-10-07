import { describe, it, expect, beforeEach } from "vitest";
import productsReducer, {
  setSearchQuery,
  setCategory,
  setSortBy,
  clearFilters,
  selectFilteredProducts,
} from "../../features/products/productsSlice";

describe("productsSlice", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      items: [
        {
          id: 1,
          title: "Product A",
          price: 100,
          category: "electronics",
          rating: { rate: 4.5, count: 100 },
        },
        {
          id: 2,
          title: "Product B",
          price: 50,
          category: "clothing",
          rating: { rate: 4.0, count: 50 },
        },
        {
          id: 3,
          title: "Product C",
          price: 75,
          category: "electronics",
          rating: { rate: 4.8, count: 200 },
        },
      ],
      currentProduct: null,
      categories: ["electronics", "clothing"],
      filters: {
        searchQuery: "",
        category: "all",
        sortBy: "default",
      },
      loading: false,
      error: null,
    };
  });

  describe("reducers", () => {
    it("should handle setSearchQuery", () => {
      const state = productsReducer(initialState, setSearchQuery("Product A"));
      expect(state.filters.searchQuery).toBe("Product A");
    });

    it("should handle setCategory", () => {
      const state = productsReducer(initialState, setCategory("electronics"));
      expect(state.filters.category).toBe("electronics");
    });

    it("should handle setSortBy", () => {
      const state = productsReducer(initialState, setSortBy("price-asc"));
      expect(state.filters.sortBy).toBe("price-asc");
    });

    it("should handle clearFilters", () => {
      const modifiedState = {
        ...initialState,
        filters: {
          searchQuery: "test",
          category: "electronics",
          sortBy: "price-asc",
        },
      };
      const state = productsReducer(modifiedState, clearFilters());
      expect(state.filters).toEqual({
        searchQuery: "",
        category: "all",
        sortBy: "default",
      });
    });
  });

  describe("selectors", () => {
    it("should filter products by search query", () => {
      const state = {
        products: {
          ...initialState,
          filters: { ...initialState.filters, searchQuery: "Product A" },
        },
      };
      const filtered = selectFilteredProducts(state);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe("Product A");
    });

    it("should filter products by category", () => {
      const state = {
        products: {
          ...initialState,
          filters: { ...initialState.filters, category: "electronics" },
        },
      };
      const filtered = selectFilteredProducts(state);
      expect(filtered).toHaveLength(2);
      expect(filtered.every((p) => p.category === "electronics")).toBe(true);
    });

    it("should sort products by price ascending", () => {
      const state = {
        products: {
          ...initialState,
          filters: { ...initialState.filters, sortBy: "price-asc" },
        },
      };
      const filtered = selectFilteredProducts(state);
      expect(filtered[0].price).toBe(50);
      expect(filtered[1].price).toBe(75);
      expect(filtered[2].price).toBe(100);
    });

    it("should sort products by price descending", () => {
      const state = {
        products: {
          ...initialState,
          filters: { ...initialState.filters, sortBy: "price-desc" },
        },
      };
      const filtered = selectFilteredProducts(state);
      expect(filtered[0].price).toBe(100);
      expect(filtered[1].price).toBe(75);
      expect(filtered[2].price).toBe(50);
    });

    it("should combine search and category filters", () => {
      const state = {
        products: {
          ...initialState,
          filters: {
            searchQuery: "Product",
            category: "electronics",
            sortBy: "default",
          },
        },
      };
      const filtered = selectFilteredProducts(state);
      expect(filtered).toHaveLength(2);
      expect(filtered.every((p) => p.category === "electronics")).toBe(true);
    });
  });
});

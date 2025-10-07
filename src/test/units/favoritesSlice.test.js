import { describe, it, expect } from "vitest";
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  selectIsFavorite,
  selectFavoritesCount,
} from "../../features/favorites/favoritesSlice";

describe("favoritesSlice", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    category: "electronics",
  };

  describe("reducers", () => {
    it("should handle addToFavorites", () => {
      const initialState = { items: [] };
      const state = favoritesReducer(initialState, addToFavorites(mockProduct));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(mockProduct);
    });

    it("should not add duplicate favorites", () => {
      const initialState = { items: [mockProduct] };
      const state = favoritesReducer(initialState, addToFavorites(mockProduct));
      expect(state.items).toHaveLength(1);
    });

    it("should handle removeFromFavorites", () => {
      const initialState = { items: [mockProduct] };
      const state = favoritesReducer(initialState, removeFromFavorites(1));
      expect(state.items).toHaveLength(0);
    });

    it("should handle clearFavorites", () => {
      const initialState = { items: [mockProduct, { ...mockProduct, id: 2 }] };
      const state = favoritesReducer(initialState, clearFavorites());
      expect(state.items).toHaveLength(0);
    });
  });

  describe("selectors", () => {
    it("should select if product is favorite", () => {
      const state = {
        favorites: { items: [mockProduct] },
      };
      const isFavorite = selectIsFavorite(1)(state);
      expect(isFavorite).toBe(true);
    });

    it("should return false if product is not favorite", () => {
      const state = {
        favorites: { items: [] },
      };
      const isFavorite = selectIsFavorite(1)(state);
      expect(isFavorite).toBe(false);
    });

    it("should select favorites count", () => {
      const state = {
        favorites: { items: [mockProduct, { ...mockProduct, id: 2 }] },
      };
      const count = selectFavoritesCount(state);
      expect(count).toBe(2);
    });
  });
});

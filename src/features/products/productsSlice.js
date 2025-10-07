import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
} from "../../utils/api";

// Async thunks
export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadProductById = createAsyncThunk(
  "products/loadProductById",
  async (id, { rejectWithValue }) => {
    try {
      const product = await fetchProductById(id);
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadCategories = createAsyncThunk(
  "products/loadCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await fetchCategories();
      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  currentProduct: null,
  categories: [],
  filters: {
    searchQuery: "",
    category: "all",
    sortBy: "default",
  },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load products
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Load product by ID
      .addCase(loadProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Load categories
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  setCategory,
  setSortBy,
  clearFilters,
  clearCurrentProduct,
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;

export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;
  let filtered = [...items];

  // Apply search filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (filters.category !== "all") {
    filtered = filtered.filter(
      (product) => product.category === filters.category
    );
  }

  // Apply sorting
  switch (filters.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      // Keep default order
      break;
  }

  return filtered;
};

export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectCategories = (state) => state.products.categories;
export const selectFilters = (state) => state.products.filters;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;

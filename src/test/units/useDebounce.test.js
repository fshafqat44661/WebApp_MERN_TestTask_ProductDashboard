import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDebounce } from "../../hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should debounce value changes", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial");

    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe("updated");
    });
  });

  it("should cancel previous timeout on rapid changes", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "first" },
      }
    );

    rerender({ value: "second" });
    vi.advanceTimersByTime(250);

    rerender({ value: "third" });
    vi.advanceTimersByTime(250);

    expect(result.current).toBe("first");

    vi.advanceTimersByTime(250);

    await waitFor(() => {
      expect(result.current).toBe("third");
    });
  });
});

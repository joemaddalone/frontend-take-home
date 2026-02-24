import { describe, it, expect, vi, beforeEach } from "vitest";
import crudFactory, { fetcher } from "./crud";

vi.mock("swr", () => {
  return {
    __esModule: true,
    default: vi.fn(() => ({
      data: { data: [] },
      error: undefined,
      isLoading: false,
    })),
    mutate: vi.fn(),
  };
});

describe("api/crud", () => {
  describe("fetcher", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("returns json on successful fetch", async () => {
      const mockData = { id: "1", name: "test" };
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => mockData,
        }),
      );

      const result = await fetcher("/api/test");
      expect(result).toEqual(mockData);
    });

    it("throws error on failed fetch", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
        }),
      );

      await expect(fetcher("/api/test")).rejects.toThrow(
        "An error occurred while fetching the data.",
      );
    });
  });

  describe("crudFactory", () => {
    it("returns a crud object", () => {
      const crud = crudFactory<{ id: string }>("/api/test");
      expect(crud).toBeDefined();
      expect(crud.get).toBeDefined();
      expect(crud.getById).toBeDefined();
      expect(crud.create).toBeDefined();
      expect(crud.update).toBeDefined();
      expect(crud.remove).toBeDefined();
    });

    it("has functioning get method", async () => {
      const crud = crudFactory<{ id: string }>("/api/test");
      const result = await crud.get();
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data?.data).toBeDefined();
      expect(result.data?.data?.length).toBe(0);
    });
  });
});

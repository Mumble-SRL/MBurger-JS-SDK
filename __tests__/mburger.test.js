import { createClient } from "../mburger";

const MBURGER_API_KEY = "7f24ae161f9070567363630870fb90d58ab67fcd";

describe("MBurger SDK", () => {
  it("create a MBurger client", () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    expect(Boolean(client["getSection"])).toBeTruthy();
    expect(Boolean(client["getBlocks"])).toBeTruthy();
    expect(Boolean(client["getBlock"])).toBeTruthy();
  });

  it("Try to create a client without an api_key", () => {
    expect(() => {
      createClient();
    }).toThrow();
  });

  it("Get a block", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getBlock({
      block_id: "1782",
    });

    expect(res).toBeInstanceOf(Array);
  });

  it("Get a block with a specific locale", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getBlock({
      block_id: "1782",

      locale: "en",
    });

    // TODO(mantovanig): missing assertion on locale
    expect(res).toBeInstanceOf(Array);
  });

  it("Get a error with an invalid block id", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    expect(async () => await client.getBlock({ block_id: "9999" })).rejects.toThrow(TypeError);
  });

  it("Get a section", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getSection({
      section_id: "321640",
    });

    expect(res.meta.id).toBe(321640);
  });

  it("Get a error with an invalid section id", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    expect(async () => await client.getSection({ section_id: "9999" })).rejects.toThrow(TypeError);
  });

  it("Get blocks array", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getBlocks({
      block_ids: [1782, 1787],
    });

    expect(res.Product.meta.id).toBe(1782);
    expect(res.Categories.meta.id).toBe(1787);
  })

  it("Get a error calling getBlocks without block_ids", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    expect(async () => await client.getBlocks()).rejects.toThrow(TypeError);
  })

  it("Get a error calling getBlocks with id that does not exist", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getBlocks({
      block_ids: [9999],
    });

    expect(res).toStrictEqual({});
  })
});

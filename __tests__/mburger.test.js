import { createClient } from "../mburger.js";
import {AxiosError} from "axios";

const MBURGER_API_KEY = "7f24ae161f9070567363630870fb90d58ab67fcd";

describe("MBurger SDK", () => {
  it("create a MBurger client", () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    expect(Boolean(client["getProject"])).toBeTruthy();
    expect(Boolean(client["getSection"])).toBeTruthy();
    expect(Boolean(client["getSections"])).toBeTruthy();
    expect(Boolean(client["getBlocks"])).toBeTruthy();
  });

  it("Try to create a client without an api_key", () => {
    expect(() => {
      createClient();
    }).toThrow();
  });

  it("Get a project", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getProject();

    const responseExpected = {
      id: 1187,
      name: 'Integration Tests',
      has_analytics: false,
      has_beacons: false,
      has_users: false,
      has_multilanguage: true,
      has_live_messages: false,
      has_push: false,
      has_subscriptions: false,
      has_payments: false,
      has_shopify: false,
      has_social_mobileauth: false,
      has_apps: false,
      tz: 'UTC',
      locales: { en: 'English' },
      plan_id: 1,
      mobile_events: null,
      mobile_views: null,
      created_at: 1613237043,
      updated_at: 1613375229
    }

    expect(res).toBeInstanceOf(Object);
    expect(res).toMatchObject(responseExpected);
  });

  it("Get sections", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getSections({
      block_id: "1782",
    });

    expect(res).toBeInstanceOf(Array);
    expect(res[0].id).toBeDefined();
    expect(res[0].visible).toBeDefined();
    expect(res[0].updated_at).toBeDefined();
    expect(res[0].available_at).toBeDefined();
    expect(typeof res[0].title).toBe('string');
  });

  it("Get sections with full response", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getSections({
      block_id: "1782",
      size: 'full',
    });

    expect(res).toBeInstanceOf(Object);
    expect(res.sections).toBeDefined();
    expect(res.sections).toBeInstanceOf(Array);
    expect(res.sections[0].elements).toBeDefined();
    expect(res.sections[0].elements.title).toBeInstanceOf(Object);
    expect(res.sections[0].elements.title.id).toBeDefined();
    expect(res.sections[0].elements.title.name).toBeDefined();
    expect(res.sections[0].elements.title.type).toBeDefined();
    expect(res.sections[0].elements.title.order).toBeDefined();
    expect(res.sections[0].elements.title.options).toBeDefined();
    expect(res.sections[0].elements.title.locale).toBeDefined();
    expect(res.sections[0].elements.title.value).toBeDefined();
    expect(res.meta).toBeDefined();
    expect(res.meta.from).toBeDefined();
    expect(res.meta.to).toBeDefined();
    expect(res.meta.total).toBeDefined();
  });

  it("Get sections with a specific locale", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getSections({
      block_id: "1782",
      locale: "en",
    })

    // TODO(mantovanig): missing assertion on locale
    expect(res).toBeInstanceOf(Array);
  });

  it("Get a error with an invalid block id", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    expect(async () => await client.getSections({ block_id: "9999" })).rejects.toThrow(AxiosError);
  });

  it("Get a section", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getSection({
      section_id: "321640",
    });

    expect(res.id).toBe(321640);
    expect(typeof res.visible).toBe('boolean');
    expect(typeof res.available_at).toBe('number');
    expect(typeof res.updated_at).toBe('number');
    expect(typeof res.title).toBe('string');
    expect(typeof res.slug).toBe('string');
    expect(typeof res.slug).toBe('string');
  });

  it("Get a section with full response", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getSection({
      section_id: "321640",
      size: 'full',
    });

    expect(res.id).toBe(321640);
    expect(res.elements.title).toBeInstanceOf(Object);
    expect(res.elements.title.id).toBeDefined();
    expect(res.elements.title.name).toBeDefined();
    expect(res.elements.title.type).toBeDefined();
    expect(res.elements.title.order).toBeDefined();
    expect(res.elements.title.options).toBeDefined();
    expect(res.elements.title.locale).toBeDefined();
    expect(res.elements.title.value).toBeDefined();
    expect(res.elements.slug).toBeInstanceOf(Object);
  });

  it("Get a error with an invalid section id", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    expect(async () => await client.getSection({ section_id: "9999" })).rejects.toThrow(AxiosError);
  });

  it("Get blocks array", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getBlocks({
      block_ids: [1782, 1787],
    });

    expect(res[0].id).toBe(1782);
    expect(res[1].id).toBe(1787);
    expect(res[0].sections).toBeDefined();
    expect(res[0].sections[0].id).toBe(337165);
    expect(typeof res[0].sections[0].title).toBe('string');
    expect(typeof res[0].sections[0].slug).toBe('string');
  })

  it("Get blocks array with full response", async () => {
    const client = createClient({
      api_key: MBURGER_API_KEY,
    });

    const res = await client.getBlocks({
      block_ids: [1782, 1787],
      size: 'full'
    });

    expect(res.meta).toBeDefined();
    expect(res.meta.from).toBeDefined();
    expect(res.meta.to).toBeDefined();
    expect(res.meta.total).toBeDefined();
    expect(res.blocks[0].id).toBe(1782);
    expect(res.blocks[1].id).toBe(1787);
    expect(res.blocks[0].sections).toBeDefined();
    expect(res.blocks[0].sections[0].id).toBe(337165);
    expect(typeof res.blocks[0].sections[0].elements.title.value).toBe('string');
    expect(typeof res.blocks[0].sections[0].elements.slug.value).toBe('string');
    expect(typeof res.blocks[0].sections[0].elements.slug.id).toBe('number');
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

    expect(client.getBlocks({block_ids: [9999]})).resolves.toStrictEqual([])
  })
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { parseRootHash, rootHash, projectSlugs, type RootProjectId } from "./root-navigation";
import { navigateRoot } from "./use-root-navigation";

afterEach(() => vi.unstubAllGlobals());

describe("root hash navigation", () => {
  it.each(["", "#home", "#unknown"])("opens home for %s", hash => {
    expect(parseRootHash(hash).view).toBe("home");
  });
  it.each(["#aboutme", "#about-me"])("restores the profile from %s", hash => {
    expect(parseRootHash(hash).view).toBe("about");
  });
  it.each(["#projects", "#products", "#projects-missing"])("defaults to the first project for %s", hash => {
    expect(parseRootHash(hash)).toEqual({ view: "products", project: "rendesco" });
  });
  it("round-trips every visible product through a shareable hash", () => {
    for (const id of Object.keys(projectSlugs) as RootProjectId[]) {
      expect(parseRootHash(rootHash("products", id))).toEqual({ view: "products", project: id });
    }
    expect(rootHash("products", "gum")).toBe("#projects-dont-touch-my-gum");
    expect(rootHash("products", "giving")).toBe("#projects-unifygiving");
    expect(rootHash("about")).toBe("#aboutme");
    expect(rootHash("home")).toBe("");
  });
  it("accepts product IDs and case-insensitive hashes", () => {
    expect(parseRootHash("#projects-gum").project).toBe("gum");
    expect(parseRootHash("#PROJECTS-CHATGIOPT").project).toBe("chatgiopt");
    expect(parseRootHash("#projects-flowfree").project).toBe("rendesco");
  });
  it("adds a history entry while retaining the current path and query", () => {
    const pushState = vi.fn();
    const dispatchEvent = vi.fn();
    vi.stubGlobal("window", {
      location: { pathname: "/", search: "?ref=portfolio", hash: "#aboutme" },
      history: { pushState }, dispatchEvent,
    });
    navigateRoot("products", "chatgiopt");
    expect(pushState).toHaveBeenCalledWith(null, "", "/?ref=portfolio#projects-chatgiopt");
    expect(dispatchEvent.mock.calls[0][0].type).toBe("portfolio-root-navigation");
  });
  it("does not create duplicate history entries for the same selection", () => {
    const pushState = vi.fn();
    vi.stubGlobal("window", { location: { hash: "#projects-chatgiopt" }, history: { pushState } });
    navigateRoot("products", "chatgiopt");
    expect(pushState).not.toHaveBeenCalled();
  });
});

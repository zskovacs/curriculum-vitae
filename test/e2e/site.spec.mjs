import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/", "/hu/"]) {
  test(`${path} is accessible and has no mobile overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);

    expect(await page.locator("html").evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("mobile navigation works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  await page.goto("/");

  const disclosure = page.locator("details.site-menu");
  await expect(disclosure.locator("summary")).not.toHaveAttribute("aria-expanded", /.*/);
  await page.locator("summary").click();
  await expect(disclosure).toHaveAttribute("open", "");
  await expect(disclosure.locator('a[href="#fithub"]')).toBeVisible();

  await context.close();
});

test("enhanced mobile navigation synchronizes and closes disclosure state", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");

  const disclosure = page.locator("details.site-menu");
  const summary = disclosure.locator("summary");
  await expect(summary).toHaveAttribute("aria-expanded", "false");
  await summary.click();
  await expect(summary).toHaveAttribute("aria-expanded", "true");
  await disclosure.locator('a[href="#fithub"]').click();
  await expect(page).toHaveURL(/#fithub$/);
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(summary).toHaveAttribute("aria-expanded", "false");
});

test("mobile layout uses a one-column reading order and comfortable targets", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");

  const summary = page.locator("details.site-menu summary");
  const summaryBox = await summary.boundingBox();
  expect(summaryBox?.height).toBeGreaterThanOrEqual(44);
  await summary.click();

  for (const link of await page.locator(".site-menu li a").all()) {
    const box = await link.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  const experience = page.locator(".experience-entry").first();
  const periodBox = await experience.locator(".experience-period").boundingBox();
  const contentBox = await experience.locator(":scope > div").boundingBox();
  expect(contentBox.y).toBeGreaterThanOrEqual(periodBox.y + periodBox.height);
});

test("navigation switches to the full desktop layout only when it fits", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("/");

  await expect(page.locator("details.site-menu summary")).toBeVisible();
  await expect(page.locator(".desktop-navigation")).toBeHidden();
  expect(await page.locator("html").evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);

  const diagnostics = [];
  for (const width of [1536, 1600, 1728, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    diagnostics.push(await page.evaluate(currentWidth => {
      const root = document.documentElement;
      const navigation = document.querySelector(".desktop-navigation");
      const links = navigation.querySelector("ul");
      const language = navigation.querySelector(".language-link");
      return {
        width: currentWidth,
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        navigationRight: navigation.getBoundingClientRect().right,
        linksRight: links.getBoundingClientRect().right,
        languageRight: language.getBoundingClientRect().right,
      };
    }, width));
  }

  console.log("desktop navigation diagnostics", JSON.stringify(diagnostics));
  await page.setViewportSize({ width: 1536, height: 800 });
  await expect(page.locator("details.site-menu summary")).toBeHidden();
  await expect(page.locator('.desktop-navigation a[href="#fithub"]')).toBeVisible();
  expect(diagnostics.every(result => result.scrollWidth <= result.clientWidth), JSON.stringify(diagnostics)).toBe(true);
});

test("navigation breakpoints do not introduce horizontal overflow", async ({ page }) => {
  for (const width of [1024, 1200, 1280, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ["/", "/hu/"]) {
      await page.goto(path);
      expect(await page.locator("html").evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
  }
});

test("keyboard users can skip navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await expect(page.locator(".skip-link")).toHaveAttribute("href", "#main-content");
});

test("reduced motion disables smooth scrolling and transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator("details.site-menu summary")).toHaveCSS("transition-duration", "0s");
});

test("print hides navigation and preserves readable content", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ media: "print" });

  await expect(page.locator("header nav")).toBeHidden();
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator(".contact-footer")).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(".ai-native")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(".project")).toHaveCSS("break-inside", "avoid");
  await expect(page.locator(".experience-entry").first()).toHaveCSS("break-inside", "avoid");

  const externalLinkContent = await page.locator('.project a[href^="http"]').evaluate(
    element => getComputedStyle(element, "::after").content,
  );
  expect(externalLinkContent).not.toBe("none");

  const pageSize = await page.evaluate(() => {
    function findPageRule(rules) {
      for (const rule of rules) {
        if (rule.constructor.name === "CSSPageRule") return rule.style.getPropertyValue("size");
        if ("cssRules" in rule) {
          const nested = findPageRule(rule.cssRules);
          if (nested) return nested;
        }
      }
      return "";
    }

    for (const sheet of document.styleSheets) {
      const size = findPageRule(sheet.cssRules);
      if (size) return size;
    }
    return "";
  });
  expect(pageSize).toBe("a4");
});

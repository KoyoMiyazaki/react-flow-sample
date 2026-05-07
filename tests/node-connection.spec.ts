import { test, expect } from "@playwright/test";

test.describe("ノード接続", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Node A から Node B に接続できる", async ({ page }) => {
    await page.dragAndDrop(
      ".react-flow__handle-right",
      ".react-flow__handle-left",
    );
    await page
      .locator('div[data-id="node-1"]')
      .locator(".react-flow__handle.react-flow__handle-right")
      .dragTo(
        page
          .locator('div[data-id="node-2"]')
          .locator(".react-flow__handle.react-flow__handle-left"),
      );

    // エッジが1つあることを検証
    await expect(page.locator(".react-flow__edge")).toHaveCount(1);
  });
});

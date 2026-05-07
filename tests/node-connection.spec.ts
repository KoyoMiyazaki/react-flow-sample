import { test, expect } from "@playwright/test";

test.describe("ノード接続", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Node A から Node B に接続できる", async ({ page }) => {
    await page
      .locator('div[data-id="node-1"]')
      .locator(".react-flow__handle.react-flow__handle-right")
      .dragTo(
        page
          .locator('div[data-id="node-2"]')
          .locator(".react-flow__handle.react-flow__handle-left"),
      );
    await page.screenshot({ path: "nodes.png", fullPage: true });

    await expect(page.locator(".react-flow__edge")).toHaveCount(1);

    // // React Flow のハンドルはホバー時にのみ表示されるため、
    // // page.dragAndDrop() では動作しない。
    // // ① ノードにホバーしてハンドルを出現させる
    // // ② ハンドルの中心座標を取得する
    // // ③ mouse.move() → mouse.down() → mouse.move() → mouse.up() の順で操作する
    // const nodeA = page
    //   .locator(".react-flow__node")
    //   .filter({ hasText: "Node A" });
    // const nodeB = page
    //   .locator(".react-flow__node")
    //   .filter({ hasText: "Node B" });

    // // Node A にホバーしてソースハンドルを出現させる
    // await nodeA.hover();
    // const sourceHandle = nodeA.locator(".react-flow__handle-right");
    // const sourceBox = await sourceHandle.boundingBox();

    // // Node B にホバーしてターゲットハンドルを出現させる
    // await nodeB.hover();
    // const targetHandle = nodeB.locator(".react-flow__handle-left");
    // const targetBox = await targetHandle.boundingBox();

    // if (!sourceBox || !targetBox) throw new Error("ハンドルが見つかりません");

    // const sourceX = sourceBox.x + sourceBox.width / 2;
    // const sourceY = sourceBox.y + sourceBox.height / 2;
    // const targetX = targetBox.x + targetBox.width / 2;
    // const targetY = targetBox.y + targetBox.height / 2;

    // await page.mouse.move(sourceX, sourceY);
    // await page.mouse.down();
    // await page.mouse.move(targetX, targetY, { steps: 30 });
    // await page.mouse.up();
  });
});

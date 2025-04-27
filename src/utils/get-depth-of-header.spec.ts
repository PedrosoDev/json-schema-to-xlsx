import { describe, it, expect, isFirstRun } from "vitest";
import { Header } from "../commons/type";
import { getDepthOfHeader } from "./get-depth-of-header";

describe("getDepthOfHeader", () => {
  it("deve retornar a profundidade correta do header", () => {
    const header: Header = {
      key: "header1",
      title: "Header 1",
      subHeaders: [
        {
          key: "header1.1",
          title: "Subheader 1.1",
          subHeaders: [
            {
              key: "header1.1.1",
              title: "Subheader 1.1.1",
            },
          ],
        },
        {
          key: "header1.2",
          title: "Subheader 1.2",
        },
      ],
    };

    const depth = getDepthOfHeader(header);
    expect(depth).toBe(3);
  });
});

import { describe, it, expect } from "vitest";
import { recursiveSubHeadersLength } from "./recursive-sub-headers-length";
import { Header } from "../commons/type";

describe("recursiveSubHeadersLength", () => {
  it("deve retornar o tamanho correto dos sub-cabeçalhos", () => {
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
            {
              key: "header1.1.2",
              title: "Subheader 1.1.2",
            },
          ],
        },
        {
          key: "header1.2",
          title: "Subheader 1.2",
          subHeaders: [
            {
              key: "header1.2.1",
              title: "Subheader 1.2.1",
            },
          ],
        },
      ],
    };

    const result = recursiveSubHeadersLength(header);

    expect(result).toBe(3);
  });
});

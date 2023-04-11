import { OutputBlockData, OutputData } from "@editorjs/editorjs";

export const convertToBlock = (markdown: string) => {
  // console.log("add happening", markdown);
  const blocks: OutputBlockData[] = [];

  const lines = markdown.split(/\r?\n/);

  let currentBlock: OutputBlockData;

  lines.forEach((line) => {
    if (line.startsWith("#")) {
      // Handle header
      currentBlock = {
        type: "header",
        data: {
          text: line.replace(/^#+\s*/, ""),
          level: line.match(/^#+/) && line.match(/^#+/)![0].length + 1,
        },
      };
      blocks.push(currentBlock);
    } else if (line.startsWith("![")) {
      // Handle image
      const match = line.match(/^!\[(.*)\]\((.*)\)/);
      currentBlock = {
        type: "image",
        data: {
          caption: match ? match[1] : "",
          file: {
            url: match ? match[2] : "",
          },
        },
      };
      blocks.push(currentBlock);
    } else if (line.startsWith(">")) {
      // Handle quote
      currentBlock = {
        type: "quote",
        data: {
          text: line.replace(/^>\s*/, ""),
        },
      };
      blocks.push(currentBlock);
    } else if (line.startsWith("* ")) {
      // Handle list
      if (currentBlock?.type !== "list") {
        currentBlock = {
          type: "list",
          data: {
            style: "unordered",
            items: [],
          },
        };
        blocks.push(currentBlock);
      }
      currentBlock.data.items.push(line.replace(/^\*\s+/, ""));
    } else if (line.startsWith("1. ")) {
      // Handle ordered list
      if (currentBlock?.type !== "list") {
        currentBlock = {
          type: "list",
          data: {
            style: "ordered",
            items: [],
          },
        };
        blocks.push(currentBlock);
      }
      currentBlock.data.items.push(line.replace(/^1\.\s+/, ""));
    } else if (line.startsWith("---")) {
      // Handle horizontal line
      currentBlock = {
        type: "delimiter",
        data: {},
      };
      blocks.push(currentBlock);
    } else if (line.trim() !== "") {
      // Handle paragraph
      currentBlock = {
        type: "paragraph",
        data: {
          text: line,
        },
      };
      blocks.push(currentBlock);
    } else {
      currentBlock = {
        type: "paragraph",
        data: {
          text: "",
        },
      };
    }
  });

  let outputData: OutputData = {
    time: Date.now(),
    blocks: blocks,
  };
  return outputData;
};

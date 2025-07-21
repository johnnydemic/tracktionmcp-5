import { createServer } from "@smithery/mcp";

const tools = {
  "ad.report": {
    description: "Return a sample ad performance report",
    parameters: {
      type: "object",
      properties: {
        platform: { type: "string" },
      },
      required: ["platform"],
    },
    handler: async ({ platform }) => {
      return {
        platform,
        spend: "$1,234.56",
        roas: 3.5,
        topAds: ["Ad A", "Ad B"],
      };
    },
  },
};

createServer({
  tools,
});


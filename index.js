import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// TOOL DEFINITIONS
const tools = [
  {
    type: "function",
    function: {
      name: "ad_spend_and_performance",
      description: "Breakdown of monthly ad spend across platforms",
      parameters: {
        type: "object",
        properties: {
          monthly_ad_spend: { type: "number" },
          meta_spend: { type: "number" },
          tiktok_spend: { type: "number" },
          google_spend: { type: "number" },
          other_spend: { type: "number" }
        },
        required: ["monthly_ad_spend"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "business_metrics",
      description: "Key business metrics",
      parameters: {
        type: "object",
        properties: {
          website_url: { type: "string" },
          mrr: { type: "number" },
          aov: { type: "number" },
          conversion_rate: { type: "number" },
          niche: { type: "string" }
        },
        required: ["website_url"]
      }
    }
  }
];

// ✅ POST /jsonrpc (for OpenAI to fetch tools)
app.post('/jsonrpc', (req, res) => {
  const { method, id } = req.body;

  if (method === 'tools') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: tools
    });
  }

  res.status(404).json({
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: 'Method not found'
    }
  });
});

// ✅ GET /jsonrpc (optional test/debug)
app.get('/jsonrpc', (_, res) => {
  res.send("✅ /jsonrpc is live. Use POST to fetch tools.");
});

// ✅ Health check
app.get('/', (_, res) => {
  res.send('✅ Tracktion MCP is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Tracktion MCP server running on port ${PORT}`);
});


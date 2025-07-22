import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Safe check to only parse valid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 'error', message: 'Invalid JSON' });
  }
  next();
});

// Tool definitions
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

// POST /jsonrpc for OpenAI to fetch tools
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

// Root route to verify server is alive
app.get('/', (_, res) => {
  res.send('✅ Tracktion MCP server is live!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Tracktion MCP server running on port ${PORT}`);
});

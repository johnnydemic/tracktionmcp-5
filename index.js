import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const tools = [
  {
    type: "function",
    function: {
      name: "ad_spend_and_performance",
      description: "Breakdown of monthly ad spend across platforms",
      parameters: {
        type: "object",
        properties: {
          monthly_ad_spend: { type: "number", description: "Total monthly ad spend" },
          meta_spend: { type: "number", description: "Spend on Meta (Facebook & Instagram)" },
          tiktok_spend: { type: "number", description: "Spend on TikTok" },
          google_spend: { type: "number", description: "Spend on Google" },
          other_spend: { type: "number", description: "Spend on other platforms" }
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
          website_url: { type: "string", description: "Your brand’s website" },
          mrr: { type: "number", description: "Monthly Recurring Revenue" },
          aov: { type: "number", description: "Average Order Value" },
          conversion_rate: { type: "number", description: "Conversion rate of your site" },
          niche: { type: "string", description: "Industry or niche of the business" }
        },
        required: ["website_url"]
      }
    }
  }
];

// POST handler for OpenAI /jsonrpc tool fetch
app.post('/jsonrpc', (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32700,
        message: 'Invalid JSON'
      }
    });
  }
});

// GET route just to verify server is running
app.get('/', (_, res) => {
  res.send('✅ Tracktion MCP is live!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Tracktion MCP server running on port ${PORT}`);
});

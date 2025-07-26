import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.post('/jsonrpc', (req, res) => {
  res.json({
    jsonrpc: '2.0',
    id: 1,
    result: [
      {
        type: 'function',
        function: {
          name: 'business_metrics',
          description: 'Key business metrics to inform marketing strategy',
          parameters: {
            type: 'object',
            properties: {
              website_url: { type: 'string', description: 'Brand website URL' },
              mrr: { type: 'number', description: 'Monthly Recurring Revenue' },
              aov: { type: 'number', description: 'Average Order Value' },
              conversion_rate: { type: 'number', description: 'Conversion rate' },
              niche: { type: 'string', description: 'Industry or niche' }
            },
            required: ['website_url']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'ad_spend_and_performance',
          description: 'Breakdown of monthly ad spend across platforms',
          parameters: {
            type: 'object',
            properties: {
              monthly_ad_spend: { type: 'number' },
              meta_spend: { type: 'number' },
              tiktok_spend: { type: 'number' },
              google_spend: { type: 'number' },
              other_spend: { type: 'number' }
            },
            required: ['monthly_ad_spend']
          }
        }
      }
    ]
  });
});

app.listen(8080, () => {
  console.log('✅ Tracktion MCP server running on port 8080');
});

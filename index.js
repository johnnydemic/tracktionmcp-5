import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const tools = {
  "get-business-profile": async ({ data }) => {
    return {
      summary: `You are running a business with URL ${data.website}.`,
    };
  }
};

app.post('/', async (req, res) => {
  const { method, id, params } = req.body;

  if (method === 'initialize') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        name: 'Tracktion MCP Server',
        version: '1.0.0',
        tools: Object.keys(tools),
      }
    });
  }

  if (method === 'tools/list') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: Object.keys(tools),
    });
  }

  if (method === 'tools/call') {
    const { name, args } = par

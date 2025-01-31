# MercadoLibre MCP Server 🔍

An MCP server that provides access to MercadoLibre API.

## Features

### Tools
- `search_products` - Search products in MercadoLibre, and return a list of products.
  - `query` - The search query
  - `category` - The category to search in
  - `filters` - The filters to apply
- `product_reviews` - Get product reviews
- `product_description` - Get product description
- `seller_reputation` - Get seller reputation

## Setup

### Prerequisites

You'll need a MercadoLibre Client ID and Client Secret to use this server.  You can get one for free at https://developers.mercadolibre.com/, create an application and get the credentials.

Once you have the credentials, you can set the `CLIENT_ID` and `CLIENT_SECRET` environment variables.  And theres also the need to set the `SITE_ID` environment variable to the site you want to use.

### Mercado Libre Site ID
- MLA: Argentina (default)
- MLB: Brasil
- MCO: Colombia
- MEX: México
- MLU: Uruguay
- MLC: Chile

### Installation

There are two ways to use this server:

#### Option 1: NPX (Recommended)
Add this configuration to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "mercadolibre-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@lumile/mercadolibre-mcp"
      ],
      "env": {
        "CLIENT_ID": "<YOUR_CLIENT_ID>",
        "CLIENT_SECRET": "<YOUR_CLIENT_SECRET>",
        "SITE_ID": "<YOUR_SITE_ID>"
      }
    }
  }
}
```
#### Option 2: Local Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

4. Add this configuration to your Claude Desktop config:
```json
{
  "mcpServers": {
    "mercadolibre-mcp": {
      "command": "node",
      "args": [
        "/path/to/mercadolibre-mcp/dist/index.js"
      ],
      "env": {
        "CLIENT_ID": "<YOUR_CLIENT_ID>",
        "CLIENT_SECRET": "<YOUR_CLIENT_SECRET>",
        "SITE_ID": "<YOUR_SITE_ID>"
      }
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Contributing

Contributions are extremely welcome! Please open a PR with new MCP servers or any other improvements to the codebase.

## Disclaimer

This project is not affiliated with MercadoLibre. All logos are trademarks of their respective owners.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

------

<p align="center">
Made with ❤️ by Lumile
</p>

<p align="center">
<a href="https://www.lumile.com.ar">Contact us</a> for custom AI development and automation solutions.
</p>

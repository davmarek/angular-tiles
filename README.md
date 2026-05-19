# Tiles - Configurable Grid

Angular showcase app with a configurable tile grid. Tiles support text, links, background colors, and background images. Settings panel lets you choose a grid schema, limit visible tiles, and edit each tile's content.

## Requirements

- Node.js (compatible with Angular 21)

## Setup

```bash
npm install
```

## Development

```bash
npm start
```

Serves the app at `http://localhost:4200/`

## Build

```bash
npm run build
```

Output goes to `dist/`

## Structure

- `src/app/components/` - UI components (tile, tiles-grid, tiles-settings, dropdown, select, toggle)
- `src/app/services/tile-service.ts` - tile configuration state
- `src/assets/tiles.json` - default tile data
- `src/assets/icons` - static SVG icons

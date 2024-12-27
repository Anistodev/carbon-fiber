<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Carbon%20Fiber&background=tiles&project=%20" alt="Carbon Fiber">
</p>

# Carbon Fiber

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

Component library inspired by IBM Carbon Design System

## Quick start

Install it:

```bash
npm i carbon-fiber
# or
yarn add carbon-fiber
# or
pnpm add carbon-fiber
```

## Tailwind Setup
To use the Carbon Fiber color palette in your project, add the plugin to your `tailwind.config.js`:
```js
module.exports = {
  content: [
    // Rest of your content
    // ...
    "./node_modules/carbon-fiber/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "background": "#111111",
        "text": "#eeeeee",
        "primary": "#0e0e0e",
        "secondary": "#191919"
      }
    }
  }
}
```

Use it:

```tsx
import { Button } from 'carbon-fiber'
```

# Sara Elamir — Portfolio

React + Vite + Bootstrap (react-bootstrap) + JavaScript.
Dark theme, scroll animations, bilingual (English / Arabic with full RTL).

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## 1) Add your photo
Put one file in `public/images/` named `sara.jpg` (or `sara.png` / `sara.webp`).
Best: portrait, 4:5 ratio (for example 800×1000). Until it exists, a clean "SE" monogram is shown.

## 2) Add project screenshots
Put images in `public/screenshots/`. Each project lists its files in `src/data/content.js`:

```js
images: ['screenshots/lms.png'],
```
Add more files to get a slider inside the project window:
```js
images: ['screenshots/lms.png', 'screenshots/lms-2.png', 'screenshots/lms-3.png'],
```
Tip: 16:10 or 16:9 screenshots look best. Optional short demo: `video: 'screenshots/lms.mp4'`.

## 3) Edit content
Everything (info, projects, services, experience, text in both languages) is in `src/data/content.js`.
Check each project's `port` and `run` commands so they match how you really start it
(for example `npm start` instead of `npm run dev`).

## Deploy (free)
- Netlify: run `npm run build`, then drag the `dist` folder to app.netlify.com/drop
- GitHub Pages: push the contents of `dist` to a `gh-pages` branch.

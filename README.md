# Bridget Crampton — Portfolio

Personal data-science portfolio built with React 19 and Vite.

## Scripts

| Command                | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server             |
| `npm run build`        | Production build into `dist/`    |
| `npm run preview`      | Serve the production build       |
| `npm run lint`         | ESLint                           |
| `npm run format`       | Format everything with Prettier  |
| `npm run format:check` | Check formatting without writing |

## Structure

```
public/
  docs/                 PDFs (resume, reports)
  images/               headshot
  images/projects/      project thumbnails
src/
  main.jsx              entry; imports global styles
  App.jsx               shell, top nav, section scroll-spy
  data/
    projects.js         project list + filter categories  ← edit to add projects
    site.js             email, resume path, social links
  components/           shared pieces (icons, ExternalLink, ProjectThumb, viz backdrops)
  sections/
    Landing.jsx
    Profile.jsx
    projects/           Projects section, bento grid, table view, modal
  styles/               base, layout, and one stylesheet per section
```

### Adding a project

Add an entry to `src/data/projects.js`. Put its screenshot in `public/images/projects/` and
reference it with `image: img('file.png', 'Alt text')`. Omit `github` for private repos, or
provide `links` to show custom buttons in the modal.

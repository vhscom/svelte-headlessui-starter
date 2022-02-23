# SvelteKit Headless UI Starter

Launch your next app with SvelteKit and Headless UI.

## Highlights

- 🏗️ [SvelteKit](https://kit.svelte.dev/) beta for file system-based routing
- 🏗️ [Svelte](https://svelte.dev/) for developing fast, lightweight apps
- 🎨 [Tailwind CSS](https://tailwindcss.com/) with Forms and Typography plugins
- 🧪 [Headless UI](https://headlessui.dev/) for access to Tailwind UI elements
- 💄 [Prettier](https://prettier.io/) with Tailwind automatic class sorting
- 🚩 [Unplugin Icons](https://github.com/antfu/unplugin-icons) to access to all [Icônes](https://icones.js.org/) icons
- ⚡️ [Cssnano](https://cssnano.co/) for production stylesheet compression
- 🦋 [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs
- 📈 [Basic SEO](https://github.com/oekazuma/svelte-meta-tags) with large social sharing cards
- 🚀 [Vercel](https://vercel.com/) deployments no configuration needed

## Demo

View the [online demo](https://sveltekit-headlessui-starter.vercel.app) to see what comes out of the box.

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Adding a changeset

To add a changeset run `pnpm changeset` and follow the prompts.

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Versioning

To create a new version run `pnpm changeset version` and follow the prompts.

## Publishing

To publish a new version run `pnpm changeset publish` followed by `git push --follow-tags`. Assumes you have logged into NPM and have a git remote configured.

## Deploying

To deploy your app to Vercel run `pnpm deploy` for testing or `pnpm deploy -- --prod` for production. Assumes you've signed-up for and logged into your Vercel account.

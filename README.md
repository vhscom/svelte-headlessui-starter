# SvelteKit Headless UI Starter

Launch your next app with SvelteKit and Headless UI.

![SvelteKit Headless UI Starter](static/screenshot.png)

SvelteKit Headless UI Starter is a template intended to make it easier to begin building libre SvelteKit apps using Tailwind CSS with Headless UI. It does so by giving some opinion to the application structure and tools used, and implements some of the more mundane aspects of application development such as SEO and authentication. To get started simply use this template and you may begin deploying to Vercel right away.

## Highlights

- 🏗️ [SvelteKit](https://kit.svelte.dev/) for file system-based routing
- 🏗️ [Svelte](https://svelte.dev/) for developing fast, lightweight apps
- 🎨 [Tailwind CSS](https://tailwindcss.com/) with Forms and Typography plugins
- 🧪 [Headless UI](https://headlessui.dev/) for access to Tailwind UI elements
- 💄 [Prettier](https://prettier.io/) with Tailwind automatic class sorting
- 🚩 [Unplugin Icons](https://github.com/antfu/unplugin-icons) to access to all [Icônes](https://icones.js.org/) icons
- ⚡️ [Cssnano](https://cssnano.co/) for production stylesheet compression
- ✏️ [Fontsource](https://fontsource.org/) self-hosted web font integration
- 🦋 [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs
- 📈 [Basic SEO](https://github.com/oekazuma/svelte-meta-tags) with large social sharing cards
- 🚀 [Vercel](https://vercel.com/) deployments functional out of the box
- 🔐 [OAuth](https://www.oauth.com/) via GitHub, extendible to other providers
- 👷 [Gravitar](https://gravatar.com/) support for non-logged in users

## Demo

View the [online demo](https://sveltekit-headlessui-starter.vercel.app) to see what you can expect.

## Structure

The application structure is as follows:

```term
├── src
│   ├── environment
│   ├── hooks
│   ├── lib
│   │   ├── core
│   │   │   └── services
│   │   │       ├── auth
│   │   │       └── http
│   │   ├── data
│   │   ├── models
│   │   │   ├── classes
│   │   │   ├── interfaces
│   │   │   └── types
│   │   ├── shared
│   │   │   ├── components
│   │   │   │   ├── auth
│   │   │   │   ├── meta
│   │   │   │   └── navigation
│   │   │   └── layouts
│   │   └── utils
│   └── routes
│       ├── account
│       └── api
│           ├── auth
│           └── user
└── static
```

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

## Rights

Launch your next app with SvelteKit and Headless UI.<br>
Copyright (C) 2022  VHS \<vhsdev@tutanota.com\> (https://vhs.codeberg.page)

SvelteKit Headless UI Starter is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

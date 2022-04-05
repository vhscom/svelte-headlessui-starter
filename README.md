[![Latest NPM version](https://flat.badgen.net/npm/v/svelte-headlessui-starter)](https://npmjs.com/svelte-headlessui-starter)
[![Weekly Downloads](https://flat.badgen.net/npm/dw/svelte-headlessui-starter)](https://npmjs.com/svelte-headlessui-starter)
[![Minimum SvelteKit version](https://flat.badgen.net/badge/SvelteKit/>=1.0.0-next.289/ff3e00)](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next289)
[![AGPL licensed](https://flat.badgen.net/npm/license/svelte-headlessui-starter)](https://codeberg.org/vhs/svelte-headlessui-starter/src/branch/trunk/COPYING)

# Svelte Headless UI Starter

Launch your next Svelte app using Headless UI.

![Svelte Headless UI Starter](static/screenshot.png)

Svelte Headless UI Starter is a template designed to make it easier and faster to build libre Svelte apps using Headless UI. The starter intends to remain as close as possible to the default experience one might achieve using `npm init svelte@next` and then building a minimalist app skeleton with Headless UI.

## Demo

View the [online demo](https://svelte-headlessui-starter.vercel.app) to see what you can expect.

## Highlights

- 🏗️ [SvelteKit](https://kit.svelte.dev/) cybernetically enhanced routing
- 🔨 [Svelte](https://svelte.dev/) for developing fast, lightweight apps
- 🎨 [Tailwind CSS](https://tailwindcss.com/) with Forms and Typography plugins
- 🧪 [Headless UI](https://svelte-headlessui.goss.io) for a sophisticated, accessible UI
- 💄 [Prettier](https://prettier.io/) with Tailwind automatic class sorting
- 🚩 [Unplugin Icons](https://github.com/antfu/unplugin-icons) to access to all [Icônes](https://icones.js.org/) icons
- ⚡️ [Cssnano](https://cssnano.co/) for production stylesheet compression
- ⚡️ [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) dynamic resource caching
- ✏️ [Fontsource](https://fontsource.org/) self-hosted web font integration
- 🎭 [Playwright](https://playwright.dev/) browser testing framework
- 🦋 [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs
- 📈 [Basic SEO](https://github.com/oekazuma/svelte-meta-tags) with large social sharing cards
- 🚀 [Vercel](https://vercel.com/) deployments functional out of the box
- 🔐 [OAuth](https://www.oauth.com/) via GitHub, extendible to other providers
- ⚗️ [Supabase](https://supabase.com/) integration for dynamic navigation
- 👷 [Gravitar](https://gravatar.com/) support for non-logged in users
- 📄 [AGPL](https://www.gnu.org/licenses/agpl-3.0.en.html)-licensed free (as in freedom) software

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
│   │   │       ├── http
│   │   │       └── supabase
│   │   ├── data
│   │   ├── models
│   │   │   ├── classes
│   │   │   ├── interfaces
│   │   │   └── types
│   │   ├── shared
│   │   │   ├── components
│   │   │   │   ├── auth
│   │   │   │   ├── calendar
│   │   │   │   ├── form
│   │   │   │   ├── meta
│   │   │   │   └── navigation
│   │   │   └── layouts
│   │   └── utils
│   └── routes
│       ├── account
│       └── api
│           ├── auth
│           └── user
├── static
└── tests
```

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Making commits

Use the approach that best suits your personal preferences and preferred work style. If you would like to add emojis to your commit messages, see [Emojify Conventional Commits with Git](https://vhs.codeberg.page/post/emojify-conventional-commits-git/) for one approach.

### Adding a changeset

To add a changeset run `pnpm changeset` and follow the prompts. If this is your first time adding a changeset, run `pnpm changeset init` to create the `.changeset` folder and commit it to the repository.

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

## Versioning

To create a new version run `pnpm changeset version` and follow the prompts.

## Publishing

To publish a new version run `pnpm changeset publish` to generate a `CHANGELOG`, followed by `git push --follow-tags`. Assumes you have logged into NPM and have a git remote configured.

## Deploying

Supported deployment environments include Vercel, Cloudflare and Netlify. Other environments may be included in the future. See [adapter-auto](https://www.npmjs.com/package/@sveltejs/adapter-auto) for most current list of supported environments. Instructions for Vercel and Cloudflare included below.

### Vercel

To deploy your app to Vercel run `vercel` for testing or `vercel --prod` for production. Assumes you've signed-up for and authenticated with Vercel from the [Vercel CLI](https://vercel.com/cli). No additional configuration is required. If you wish to create a Continuous Integration (CI) setup with a git repo connected to Vercel, consult the Vercel docs.

### Cloudflare

Cloudflare is a little more involved and deployments blocked until [sk-auth/issues/42](https://github.com/Dan6erbond/sk-auth/issues/42) is resolved. The referenced issue has an open pull request in case you wish to fork until the package is updated with a fix.

Start by updating the adapter used in `svelte.config.js` and change the import for `adapter-auto` to `adapter-cloudflare`. The Cloudflare adapter is already included with `adapter-auto`, though you may wish to `pnpm add -D adapter-cloudflare` to be more explicit and then remove `adapter-auto` from the project.

You can get a CI setup running without any additional configuration described in the [Cloudflare Docs for Svelte](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/). Reference the `engines` property in `package.json` for the minimum Node version required to build the project.

For CLI-based deployments use the `wrangler publish` command. Assumes you've signed-up for and logged into your Cloudflare account using [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/install-update/), and that a `wrangler.toml` has been created within the project. See [Wrangler Configuration](https://developers.cloudflare.com/workers/cli-wrangler/configuration/) and [here](https://github.com/sveltejs/kit/issues/2966) for additional help.

## Rights

Svelte Headless UI Starter - Launch your next Svelte app using Headless UI.<br>
Copyright (C) 2022&nbsp;&nbsp;VHS &lt;vhsdev@tutanota.com&gt; (https://vhs.codeberg.page)

Svelte Headless UI Starter is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

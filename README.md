# Medbot Documentation

## Introduction
Repository for [Medbot](https://www.medbot.me) application's documentation.

## Getting Started

Install pnpm modules
`pnpm i`

Run next app
`pnpm dev`

Run the tests
`pnpm test`

## Linking from the Medbot apps

Apps link to the docs through `/help`, never to a docs page directly. The
docs then open the guide for the screen the user is on, so pages can move
without breaking links in the apps.

```
https://docs.medbot.me/help/<surface>/<app path>[?topic=<topic>]
```

| Surface          | App                               | Falls back to                      |
| ---------------- | --------------------------------- | ---------------------------------- |
| `cms`            | Medbot CMS (cms.medbot.me)        | `/cms`                             |
| `cms-desktop`    | Medbot CMS desktop                | `/cms/downtime/cms-desktop`        |
| `patient`        | Medbot Health (health.medbot.me)  | `/patient`                         |
| `patient-mobile` | Medbot Health mobile              | `/patient/mobile-app`              |
| `app`            | Medbot app (app.medbot.me)        | `/docs`                            |
| `desktop`        | Medbot desktop                    | `/docs/desktop-and-mobile/desktop` |
| `mobile`         | Medbot mobile                     | `/docs/desktop-and-mobile/mobile`  |
| `agents`         | The AI agents module, in any app  | `/docs/agents`                     |

Examples: `/help/cms/queue` opens Reception Queue,
`/help/cms/patients/<id>/medications` opens Prescribing, and
`/help/patient/log/plan` opens Health Plan. A screen with no rule opens
the surface's introduction. `?topic=` names a task instead of a screen
(`getting-started`, `report-a-problem`, `account`, `roles`, …).

A plain link to `https://docs.medbot.me` from an app host also opens that
app's guides (from the Referer, or `?from=<surface>`).

The rules live in `lib/help-routing.mjs`. When you add or move a page, add
or update its rule there; `pnpm test` fails if a rule points at a page or
heading that does not exist.

# i18next-smartdate

A small tool for making i18next, that allows you easaly translate close dates and times.
Uses default internationalization. Can be configured via `DatePluginOptions`;

## Features

- [x] Translate dates
- [x] Translate times
- [x] Translate date and time close to now
  - [x] ereyesterday
  - [x] yesterday
  - [x] today
  - [x] tomorrow
  - [x] overmorrow
  - [x] this year
- [x] Default translations

## To Do

- [ ] Suppoort shorter time formats (just now, 10 minutes ago, 1 hour ago, etc)
- [ ] Support custom date and time formatters

## Installation

```bash
$ npm i i18next-smartdate
```

## Usage

```typescript
import { i18next } from 'i18next';
import { DatePlugin, DatePluginOptions } from 'i18next-smartdate';

const resources = {
  en: {
    translation: {
      date_default: '{{date}} at {{time}}',
      date_this_year: '{{date}} at {{time}}',
      date_yesterday: 'Yesterday at {{time}}',
      date_today: 'Today at {{time}}',
      date_tomorrow: 'Tomorrow at {{time}}',
    },
  },
  uk: {
    translation: {
      date_default: '{{date}} о {{time}}',
      date_this_year: '{{date}} о {{time}}',
      date_ereyesterday: 'Позавчора о {{time}}',
      date_yesterday: 'Вчора о {{time}}',
      date_today: 'Сьогодні о {{time}}',
      date_tomorrow: 'Завтра о {{time}}',
      date_overmorrow: 'Післязавтра о {{time}}',
    },
  },
};

void i18next.use(SmartDatePlugin).init({
  resources,
});

const now = new Date();
const yesterday = new Date(new Date(d2).setDate(d2.getDate() - 1));
const tomorrow = new Date(new Date(d2).setDate(d2.getDate() + 1));
const lastYear = new Date(new Date(d2).setFullYear(d2.getFullYear() - 1));

console.log(
  i18next.t('date', {
    date: new Date('2024-10-13T13:00:00Z'),
    postProcess: ['smartdate'],
  }),
);

// Output:
// Today at at 01:00 PM
// Or
// Сьогодні о 13:00
```

## Contrubution

The more MB of a bundle we have -- the more features we deliver. It works that way, I believe.

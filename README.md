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
import i18next from 'i18next';
import SmartDatePlugin from 'i18next-smartdate';

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

i18next.use(SmartDatePlugin).init({
  lng: 'en',
  resources,
  postProcess: ['smartdate'], // or individually ['smartdate'] for `t()` calls
});

const now = new Date();
const yesterday = new Date(new Date(now).setDate(now.getDate() - 1));
const tomorrow = new Date(new Date(now).setDate(now.getDate() + 1));
const lastYear = new Date(new Date(now).setFullYear(now.getFullYear() - 1));
const overmorrow = new Date(new Date(now).setDate(now.getDate() + 2));

console.log(
  i18next.t('date', {
    date: now,
  }),
);

// Output: Today at 04:00 PM

console.log(
  i18next.t('date', {
    date: yesterday,
  }),
);

// Output: Yesterday at 04:00 PM

console.log(
  i18next.t('date', {
    date: tomorrow,
  }),
);

// Output: Tomorrow at 04:00 PM

console.log(
  i18next.t('date', {
    date: lastYear,
  }),
);

// October 13, 2023 at 04:00 PM

console.log(
  i18next.t('date', {
    date: overmorrow,
  }),
);

// Output: October 15 at 04:00 PM

await i18next.changeLanguage('uk');
console.log(
  i18next.t('date', {
    date: overmorrow,
  }),
);

// Output: Післязавтра о 04:00 PM
```

## Contrubution

The more MB of a bundle we have -- the more features we deliver. It works that way, I believe.

import { type ModuleType, type TFunction } from 'i18next';

interface DatePluginOptions {
  date?: Date;
  formatTime?: Pick<Intl.DateTimeFormatOptions, 'hour' | 'minute' | 'second' | 'dayPeriod' | 'hour12'>;
  formatDate?: Pick<Intl.DateTimeFormatOptions, 'year' | 'month' | 'day' | 'weekday'>;
  timeZone?: string;
}

const isThisYear = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear();
const isEreyesterday = (d1: Date, d2: Date) =>
  d1.toDateString() === new Date(new Date(d2).setDate(d2.getDate() - 2)).toDateString();
const isYesterday = (d1: Date, d2: Date) =>
  d1.toDateString() === new Date(new Date(d2).setDate(d2.getDate() - 1)).toDateString();
const isToday = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();
const isTomorrow = (d1: Date, d2: Date) =>
  d1.toDateString() === new Date(new Date(d2).setDate(d2.getDate() + 1)).toDateString();
const isOvermorrow = (d1: Date, d2: Date) =>
  d1.toDateString() === new Date(new Date(d2).setDate(d2.getDate() + 2)).toDateString();

const SmartDatePlugin = {
  type: 'postProcessor' as ModuleType,
  name: 'smartdate',

  process(
    value: string,
    key: string,
    options: DatePluginOptions,
    translator: { language: string; translate: TFunction; exists: (key: string) => boolean },
  ): string {
    if (!options.date || options.date instanceof Date === false) {
      return value;
    }

    const date = options.date;

    const {
      formatTime = {
        hour: '2-digit',
        minute: '2-digit',
      },
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    } = options;

    const now = new Date();
    const timeFormatter = new Intl.DateTimeFormat(translator.language, {
      ...formatTime,
      timeZone,
    });

    const formattedTime = timeFormatter.format(date);

    switch (true) {
      case isEreyesterday(date, now) && translator.exists(`${key}_ereyesterday`):
        return translator.translate(`${key}_ereyesterday`, { time: formattedTime });

      case isYesterday(date, now) && translator.exists(`${key}_yesterday`):
        return translator.translate(`${key}_yesterday`, { time: formattedTime });

      case isToday(date, now) && translator.exists(`${key}_today`):
        return translator.translate(`${key}_today`, { time: formattedTime });

      case isTomorrow(date, now) && translator.exists(`${key}_tomorrow`):
        return translator.translate(`${key}_tomorrow`, { time: formattedTime });

      case isOvermorrow(date, now) && translator.exists(`${key}_overmorrow`):
        return translator.translate(`${key}_overmorrow`, { time: formattedTime });

      case isThisYear(date, now) && translator.exists(`${key}_this_year`): {
        const { formatDate = { month: 'long', day: 'numeric' } } = options;

        const dateFormatter = new Intl.DateTimeFormat(translator.language, {
          ...formatDate,
          timeZone,
        });

        const formattedDate = dateFormatter.format(date);

        return translator.translate(`${key}_this_year`, { date: formattedDate, time: formattedTime });
      }

      default: {
        const { formatDate = { year: 'numeric', month: 'long', day: 'numeric' } } = options;

        const dateFormatter = new Intl.DateTimeFormat(translator.language, {
          ...formatDate,
          timeZone,
        });

        const formattedDate = dateFormatter.format(date);

        return translator.translate(`${key}_default`, { date: formattedDate, time: formattedTime });
      }
    }
  },
};

export default SmartDatePlugin;

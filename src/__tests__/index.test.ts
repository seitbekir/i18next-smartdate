import i18next from 'i18next';
import { SmartDatePlugin } from '..';

describe('i18nest-smartdate', () => {
  const mockDate = new Date('2024-10-13T12:00:00Z');

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(mockDate);

    i18next.use(SmartDatePlugin).init({
      lng: 'en',
      postProcess: ['smartdate'],
      resources: {
        en: {
          translation: {
            test_default: 'Default {{date}} at {{time}}',
            test_this_year: 'This year {{date}} at {{time}}',
            test_ereyesterday: 'Ereyesterday at {{time}}',
            test_yesterday: 'Yesterday at {{time}}',
            test_today: 'Today at {{time}}',
            test_tomorrow: 'Tomorrow at {{time}}',
            test_overmorrow: 'Overmorrow at {{time}}',
          },
        },
      },
    });
  });

  it('should always be UTC', () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });

  describe('display date and time on default formating', () => {
    it('should display the time of last year', () => {
      const date = new Date('2023-10-13T12:00:00Z');
      const result = i18next.t('test', { date });
      expect(result).toEqual('Default October 13, 2023 at 12:00 PM');
    });

    it('should display the time of this year', () => {
      const date = new Date('2024-09-13T12:00:00Z');
      const result = i18next.t('test', { date });
      expect(result).toEqual('This year September 13 at 12:00 PM');
    });

    it('should display the time of ereyesterday', () => {
      const date = new Date('2024-10-11T12:00:00Z');
      const result = i18next.t('test', { date });
      expect(result).toEqual('Ereyesterday at 12:00 PM');
    });

    it('should display the time of yesterday', () => {
      const date = new Date('2024-10-12T12:00:00Z');
      const result = i18next.t('test', { date });
      expect(result).toEqual('Yesterday at 12:00 PM');
    });

    it('should display the time of today', () => {
      const date = new Date('2024-10-13T12:00:00Z');
      const result = i18next.t('test', { date });
      expect(result).toEqual('Today at 12:00 PM');
    });

    it('should display the time of tomorrow', () => {
      const date = new Date('2024-10-14T12:00:00Z');
      const result = i18next.t('test', { date });
      expect(result).toEqual('Tomorrow at 12:00 PM');
    });

    it('should display the time of overmorrow', () => {
      const date = new Date('2024-10-15T12:00:00Z');
      const result = i18next.t('test', { date });
      expect(result).toEqual('Overmorrow at 12:00 PM');
    });
  });

  describe('formated date and time', () => {
    it('should display the time in the default format with options', () => {
      const date = new Date('2023-10-13T12:00:00Z');
      const result = i18next.t('test', { date, formatDate: { year: 'numeric' } });
      expect(result).toEqual('Default 2023 at 12:00 PM');
    });

    it('should display the time in this year format with options', () => {
      const date = new Date('2024-09-13T12:00:00Z');
      const result = i18next.t('test', { date, formatDate: { year: 'numeric' } });
      expect(result).toEqual('This year 2024 at 12:00 PM');
    });

    it('should display the time in ereyesterday format with options', () => {
      const date = new Date('2024-10-11T13:00:00Z');
      const result = i18next.t('test', { date, formatTime: { hour: 'numeric', minute: 'numeric', hour12: false } });
      expect(result).toEqual('Ereyesterday at 13:00');
    });
  });
});

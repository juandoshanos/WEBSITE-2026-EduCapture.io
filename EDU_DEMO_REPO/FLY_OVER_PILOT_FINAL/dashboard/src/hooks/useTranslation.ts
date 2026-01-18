import { translations, Language, TranslationKey } from '@/lib/translations';

export const useTranslation = (language: Language) => {
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.EN[key] || key;
  };

  return { t };
};
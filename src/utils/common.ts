import { LangType } from '../types/langTypes.ts';
import i18n from 'i18next';

export const changeLanguageFunc = (lan: LangType) => {
    i18n.changeLanguage(lan);
};

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './ru.json';
import en from './en.json';
import pl from './pl.json';

i18n.use(initReactI18next).init({
    resources: {
        ru: {
            translation: ru,
        },
        en: {
            translation: en,
        },
        pl: {
            translation: pl,
        },
    },
    // lng: LangType.EN,
    compatibilityJSON: 'v4',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

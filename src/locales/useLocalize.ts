import { useTranslation } from 'react-i18next';
import i18n, { type TFunction } from 'i18next';

import en from './en.json';
import ru from './ru.json';
import pl from './pl.json';
import { LangType } from '../types/langTypes.ts';
import { ILang } from './langTypes.ts';

interface Localize {
    localize: ILang;
    t: TFunction<'translation', undefined>;
    changeLanguage: (lan: LangType) => void;
}

const useLocalize = (): Localize => {
    const { t } = useTranslation();

    const localize = (lan: LangType): ILang => {
        switch (lan) {
            case LangType.EN:
                return en;
            case LangType.RU:
                return ru;
            case LangType.PL:
                return pl;
            default:
                return ru;
        }
    };

    const changeLanguage = (lan: LangType) => {
        i18n.changeLanguage(lan);
    };

    return { localize: localize(i18n.language as LangType), t, changeLanguage };
};

export default useLocalize;

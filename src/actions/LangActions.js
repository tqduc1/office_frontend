import { createAction } from "redux-actions";
import { CHANGE_LANG } from "@Constants/actiontype/LanguageActionType";
const changeLanguage = createAction(CHANGE_LANG);
export { changeLanguage };

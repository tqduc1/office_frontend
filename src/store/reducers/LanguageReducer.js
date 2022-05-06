import { CHANGE_LANG } from "../../constants/actiontype/LanguageActionType";
const DEFAULT_STATE_LANGUAGE = {
  language: "en",
};

const languageReducer = (state = DEFAULT_STATE_LANGUAGE, action) => {
  if (action.type === CHANGE_LANG) {
    return {
      ...state,
      language: action.payload,
    };
  } else {
    return state;
  }
};

export default languageReducer;

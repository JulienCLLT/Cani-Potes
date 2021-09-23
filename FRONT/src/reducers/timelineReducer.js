/* eslint-disable linebreak-style */
const initialState = {
  isUserFormComplete: false,
  isDogFormComplete: false,
  // valider, en cours, masqué
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.fieldName]: action.value,
      };
    default:
      return state;
  }
};
export default reducer;

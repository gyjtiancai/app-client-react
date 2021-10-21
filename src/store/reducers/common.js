export default function common(state = {}, action) {
    switch (action.type) {
        case 'setLanguage':
            return Object.assign({}, state, {
                currentLanguage: action.data
            });            
        case 'setUserInfo':
            return Object.assign({}, state, {
                userInfo: action.data
            });
        default:
            return state;
    }
}
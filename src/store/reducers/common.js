export default function common(state = {}, action) {
    switch (action.type) {
        case 'setUserInfo':
            return Object.assign({}, state, {
                userInfo: action.data
            });
        default:
            return state;
    }
}
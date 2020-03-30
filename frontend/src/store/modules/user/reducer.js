export default function user(state = [], action) {
  switch (action.type) {
    case 'SIGN_IN':
      return [...state, action.email];

    default:
      return state;
  }
}

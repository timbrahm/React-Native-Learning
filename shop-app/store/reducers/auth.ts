import { AUTHENTICATE, LOGOUT } from "../actions/auth";

type State = {
  token: string | null;
  userId: string | null;
};

type Action = {
  type: string;
  token: string;
  userId: string;
};

const initialState: State = {
  token: null,
  userId: null,
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

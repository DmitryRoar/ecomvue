// action - state management
import { IUserDataAPI } from 'contexts/types';
import { LOGIN, LOGOUT, REGISTER, UPDATE_USER_PERSONAL } from './actions';

// types
import { IPayloadLoginType } from 'types';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: IUserDataAPI | unknown = null;

export class StorageNames {
  static readonly token = 'tokens';
}

interface AccountReducerActionProps {
  type: string;
  payload?: IPayloadLoginType;
}

const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!;
      return user;
    }
    case LOGIN: {
      const { user } = action.payload!;
      return user;
    }
    case LOGOUT: {
      return null;
    }
    case UPDATE_USER_PERSONAL: {
      const { partUser } = action.payload!;
      return { ...(state as IUserDataAPI), ...partUser };
    }
    default:
      state;
  }
};

export default accountReducer;

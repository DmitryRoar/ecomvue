// third-party
import { combineReducers } from 'redux';

// project imports
import calendarReducer from './slices/calendar';
import chatReducer from './slices/chat';
import contactReducer from './slices/contact';
import customerReducer from './slices/customer';
import mailReducer from './slices/mail';
import productReducer from './slices/product';
import snackbarReducer from './slices/snackbar';
// import userReducer from './slices/user';
import kanbanReducer from './slices/kanban';
import marketplaceReducer from './slices/marketplace';
import menuReducer from './slices/menu';
import organizationReducer from './slices/organization';
import referalReducer from './slices/referal';
import tariffReducer from './slices/tariff';
import userReducer from './slices/user';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  marketplace: marketplaceReducer,
  organization: organizationReducer,
  tariff: tariffReducer,
  referal: referalReducer,
  snackbar: snackbarReducer,
  kanban: kanbanReducer,
  customer: customerReducer,
  contact: contactReducer,
  product: productReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  mail: mailReducer,
  user: userReducer,
  menu: menuReducer
});

export default reducer;

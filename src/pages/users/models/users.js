import { queryUsers, queryCurrentUser} from '@/services/users';
import { getCurrentUser } from '@/services/authorityService';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *queryUsers(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'saveUsers',
        payload: response,
      });
    },
    *queryCurrentUser({payload}, { call, put }) {
      const response = yield call(queryCurrentUser, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      let user = action.payload;
      return {
        ...state,
        currentUser: user || {},
      };
    },
  },
};

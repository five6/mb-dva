import { queryUsers, queryCurrentUser, getFakeCaptcha, logout, login} from '@/services/users';
import { setAuthority, clearAuthority } from '@/utils/authority';
import { message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    status: undefined,
  },

  effects: {
    *logout({payload}, { call, put }) {
      clearAuthority();
      const result = yield call(logout, payload);
      message.success('您已成功退出！')//formatMessage({id: 'common.success'}))
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentUser: null,
        },
      });
    },
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
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    changeLoginStatus(state, { payload }) {
      if (payload.status === true)
        setAuthority(payload);
      else
        clearAuthority();
      return {
        ...state,
        currentUser: payload.currentUser,
        status: payload.status,
      };
    },
  },
};

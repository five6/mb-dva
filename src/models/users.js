import { queryUsers, queryCurrentUser, register, login} from '@/services/users';
import { setAuthority, clearAuthority} from '@/utils/authority';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
    status: undefined,
  },

  effects: {
    *login({payload, callback}, { call, put }) {
      const response = yield call(login, payload);
      if (response.code === 0) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            datas: response.datas
          }
        });
      }
      callback(response);
    },
    *register({payload, callback}, { call, put }) {
      const response = yield call(register, payload);
      callback(response);
    },
    *logout(_, { call, put }) {
      message.success('您已安全退出！');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
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
        setAuthority(payload.datas);
      else {
        clearAuthority();
        window.location.href ='/login';
      }
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

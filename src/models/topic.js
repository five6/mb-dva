import { fetchTopics, fetchTopicReply, createTopic, deleteReply, fetchTopicType, createReply, deleteTopic } from '@/services/topic';
import { setAuthority, clearAuthority } from '@/utils/authority';

export default {
  namespace: 'topic',

  state: {
    topicData: {
        items: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
    },
    currentUser: {},
    status: undefined,
  },

  effects: {
    *fetchTopics({payload}, { call, put }) {
      const response = yield call(fetchTopics, payload);
      yield put({
        type: 'saveTopics',
        payload: response,
      });
    },
    *fetchTopicType({payload}, { call, put }) {
        const response = yield call(fetchTopicType, payload);
        yield put({
          type: 'saveTopicType',
          payload: response,
        });
    },
    *fetchTopicReply({payload}, { call, put }) {
        const response = yield call(fetchTopicReply, payload);
        yield put({
          type: 'saveTopicReply',
          payload: response,
        });
    },
    *createTopic({payload, callback}, { call, put }) {
        const response = yield call(createTopic, payload);
        callback(response);
    },
    *createReply({payload, callback}, { call, put }) {
        const response = yield call(createReply, payload);
        callback(response);
    },
    *deleteTopic({payload, callback}, { call, put }) {
        const response = yield call(deleteTopic, payload);
        callback(response);
    },
    *deleteReply({payload, callback}, { call, put }) {
        const response = yield call(deleteReply, payload);
        callback(response);
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

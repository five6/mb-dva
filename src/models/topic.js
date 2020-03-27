import { fetchRecommendTopics, fetchHotTopics, fetchFollowings, fetchTopicReply, createTopic, deleteReply, fetchTopicType, createReply, deleteTopic } from '@/services/topic';
import { setAuthority, clearAuthority } from '@/utils/authority';

export default {
  namespace: 'topic',

  state: {
    hotData: {
        items: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
    },
    followingData: {
      items: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1
    },
    recommendData: {
      items: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1
    },
    currentUser: {},
    status: undefined,
  },

  effects: {
    *fetchRecommendData({payload}, { call, put }) {
      const result = yield call(fetchRecommendTopics, payload);
      yield put({
        type: 'saveRecommendData',
        payload: { queryCond: payload, result }
      });
    },
    *fetchHotData({payload}, { call, put }) {
      const result = yield call(fetchHotTopics, payload);
      yield put({
        type: 'saveHotData',
        payload: { queryCond: payload, result }

      });
    },
    *fetchFollowingData({payload}, { call, put }) {
      const result = yield call(fetchFollowings, payload);
      yield put({
        type: 'saveFollowingData',
        payload: { queryCond: payload, result }
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
    saveRecommendData(state, { payload: { queryCond, result } }) {
      const data = { ...state.recommendData };
      data.items = result.items;
      data.currentPage = queryCond.currentPage;
      data.totalCount = result.totalCount;
      return {
        ...state,
        recommendData: data,
      };
    },
    saveHotData(state, { payload: { queryCond, result } }) {
      const data = { ...state.hotData };
      data.items = result.items;
      data.currentPage = queryCond.currentPage;
      data.totalCount = result.totalCount;
      return {
        ...state,
        hotData: data,
      };
    },
    saveFollowingData(state, { payload: { queryCond, result } }) {
      const data = { ...state.followingData };
      data.items = result.items;
      data.currentPage = queryCond.currentPage;
      data.totalCount = result.totalCount;
      return {
        ...state,
        followingData: data,
      };
    },
  
  },
};

import { fetchTopics, fetchTopicReply, createTopic, deleteReply, fetchTopicType, createReply, deleteTopic } from '@/services/topic';
import { setAuthority, clearAuthority } from '@/utils/authority';

export default {
  namespace: 'topic',

  state: {
    topicTypes: [],
    topicDatas: {
        all: {
          items: [],
          totalCount: 0,
          pageSize: 10,
          currentPage: 1
        },
        googd: {
          items: [],
          totalCount: 0,
          pageSize: 10,
          currentPage: 1
        },
        share: {
          items: [],
          totalCount: 0,
          pageSize: 10,
          currentPage: 1
        },
        ask: {
          items: [],
          totalCount: 0,
          pageSize: 10,
          currentPage: 1
        },
        job: {
          items: [],
          totalCount: 0,
          pageSize: 10,
          currentPage: 1
        }
    },
    currentUser: {},
    status: undefined,
  },

  effects: {
    *fetchTopicTypes(_, {call, put}) {
      const result = yield call(fetchTopicType);
      const typeObj = result.datas;
      const topicTypes = [];
      for (let key in typeObj) {
        topicTypes.push({
          label: key,
          value: typeObj[key]
        });
      }
      yield put({
        type: 'saveTopicTypes',
        payload: topicTypes
      });
    },
    *fetchTopics({payload}, { call, put }) {
      const result = yield call(fetchTopics, payload);
      yield put({
        type: 'saveTopicData',
        payload: { queryCond: payload, result }
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
    saveTopicTypes(state, { payload }) {
      return {
        ...state,
        topicTypes: payload
      }
    },
    saveTopicData(state, { payload: { queryCond, result } }) {
      const tab = queryCond.topicType || 'all';
      const data = { ...state.topicDatas[tab] };
      
      data.items = result.items;
      data.currentPage = queryCond.currentPage;
      data.totalCount = result.totalCount;

      const topicDatas = state.topicDatas;
      topicDatas[tab] = data;
      return {
        ...state,
        topicDatas
      };
    },
  },
};

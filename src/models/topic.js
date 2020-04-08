import { upvoteCount, fetchTopics, fetchTopicReply, createTopic, fetchTopicDetail, deleteReply, fetchTopicType, createReply, deleteTopic } from '@/services/topic';
import { setAuthority, clearAuthority } from '@/utils/authority';
import * as _ from 'lodash';

const defaultState = {
  topicDetail: {},
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
}

export default {
  namespace: 'topic',
  state: defaultState,
  effects: {
    *upvoteCount({payload, callback}, { call, put }) {
      const result = yield call(upvoteCount, payload);
      yield put({
        type: 'saveAfterUpvoteCount',
        payload: { queryCond: payload, result }
      });
    },
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
    *fetchTopicDetail({payload, callback}, {call, put}) {
      const response = yield call(fetchTopicDetail, payload);
      yield put({
        type: 'saveTopicDetail',
        payload: response.datas,
      });
      if(callback && typeof callback === 'function')
        callback(response);
    }
  },

  reducers: {
    saveAfterUpvoteCount(state, { payload: { queryCond, result } }) {
      const tab = queryCond.topicType || 'all';
      const data = { ...state.topicDatas[tab] };
      const index = _.findIndex(data.items, item => {
        return item._id === queryCond.id;
      })
      if(queryCond.type === 'down') {
        data.items[index].upvoteCount = data.items[index].upvoteCount - 1;
        data.items[index].hasUpvotedCount = false;
      } else {
        data.items[index].upvoteCount = data.items[index].upvoteCount + 1;
        data.items[index].hasUpvotedCount = true;
      }
      const topicDatas = state.topicDatas;
      topicDatas[tab] = data;
      return {
        ...state,
        topicDatas
      };
    },
    saveTopicDetail(state, { payload }) {
      return {
        ...state,
        topicDetail: payload
      }
    },
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

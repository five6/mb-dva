import request from '@/utils/request';
import { apiPrefix } from '@/utils/api.prefix';

export async function fetchTopics() {
  return request(`${apiPrefix}/topics`);
}


export async function createTopic(data) {
  return request(`${apiPrefix}/topics`, {
    method: 'POST',
    data,
  });
}


export async function fetchTopicReply(payload) {
  return request(`${apiPrefix}/comments`, {
    method: 'GET',
    params: payload,
  });
}

export async function fetchSubReply(payload) {
  return request(`${apiPrefix}/comments/more-sub-comments`, {
    method: 'POST',
    data: payload,
  });
}

export async function createReply(payload) {
  return request(`${apiPrefix}/comments`, {
    method: 'POST',
    data: payload
  });
}

export async function deleteReply(id) {
  return request(`${apiPrefix}/comments/${id}`, {
    method: 'DELETE'
  });
}

export async function deleteTopic(id) {
  return request(`${apiPrefix}/topics/${id}`, {
    method: 'DELETE'
  });
}



export async function fetchUserTopics(payload) {
  return request(`${apiPrefix}/topics/user`, {
    method: 'GET',
    params: payload,
    headers: {
      Accept: "application/json"
    },
  })
}

export async function fetchTopicType(payload) {
  return request(`${apiPrefix}/topic-type`, {
    method: 'GET',
    params: payload,
    headers: {
      Accept: "application/json"
    },
  })
}

export async function fetchTopicDetail(id) {
  return request(`${apiPrefix}/topics/detail`, {
    params: {
      id
    },
    method: 'GET',
    headers: {
      Accept: "application/json"
    },
  })
}


export async function upvoteCount(payload) {
  return request(`${apiPrefix}/topics/upvoteCount`, {
    method: 'PUT',
    params: payload,
    headers: {
      Accept: "application/json"
    },
  })
}



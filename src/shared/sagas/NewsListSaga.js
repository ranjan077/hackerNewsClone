import "regenerator-runtime/runtime";
import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from '../Api/api';
import actions from "../actions/NewsListAction";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchNews(action) {
   try {
      const response = yield call(Api.fetchNews, action.payload);
      const news = response.hits.map((data) => {
         return {
            objectID: data.objectID,
            title: data.title,
            url: data.url,
            createdAt: data['created_at'],
            points: data.points,
            author: data.author,
            commentsCount: data['num_comments'],
            isUpvoted: false,
         }
      });
      yield put(actions.getNewsSuccess(news));
      return response;
   } catch (e) {
      yield put(actions.getNewsFail(e));
   }
}

export function* fetchFilteredNews(action) {
   try {
      const response = yield call(Api.fetchNews, action.payload);
      const news = response.hits.map((data) => {
         return {
            objectID: data.objectID,
            title: data.title,
            url: data.url,
            createdAt: data['created_at'],
            points: data.points,
            author: data.author,
            commentsCount: data['num_comments'],
            isUpvoted: false,
         }
      });
      yield put(actions.getFilteredNewsSuccess(news));
      return response;
   } catch (e) {
      yield put(actions.getNewsFail(e));
   }
}
export function* watchFetchNews() {
   yield takeLatest("NEWS_FETCH_REQUESTED", fetchNews);
}

export function* watchFetchMoreNews() {
   yield takeLatest("NEWS_FETCH_MORE_REQUESTED", fetchNews);
}

export function* watchFilteredNews() {
   yield takeLatest("FILTERED_NEWS", fetchFilteredNews);
}

function* watcherSaga() {
  yield all([fork(watchFetchNews), fork(watchFetchMoreNews), fork(watchFilteredNews)]);
}

export default watcherSaga;
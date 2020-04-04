import "regenerator-runtime/runtime";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from '../Api/api';
import actions from "../actions/NewsListAction";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchNews(action) {
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

function* fetchFilteredNews(action) {
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

function* mySaga() {
  yield takeLatest("NEWS_FETCH_REQUESTED", fetchNews);
  yield takeLatest("NEWS_FETCH_MORE_REQUESTED", fetchNews);
  yield takeLatest("FILTERED_NEWS", fetchFilteredNews);
}

export default mySaga;
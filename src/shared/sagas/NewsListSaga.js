import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from '../Api/api';
import actions from "../actions/NewsListAction";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchNews(action) {
   try {
      const response = yield call(Api.fetchNews, action.payload);
      /*const news = response.map((data) => {
         return {
            title: data.title,
            points: data.points,
            author: data.author,
         }
      });*/
      yield put(actions.getNewsSuccess(response.hits));
      return response;
   } catch (e) {
      yield put(actions.getNewsFail(e));
   }
}


function* mySaga() {
  yield takeLatest("NEWS_FETCH_REQUESTED", fetchNews);
  yield takeLatest("NEWS_FETCH_MORE_REQUESTED", fetchNews);
}

export default mySaga;
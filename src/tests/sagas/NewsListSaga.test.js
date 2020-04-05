import { all, fork, takeLatest } from 'redux-saga/effects';
import watcherSaga, {watchFetchNews, watchFetchMoreNews, watchFilteredNews, fetchNews, fetchFilteredNews} from '../../shared/sagas/NewsListSaga';

describe('WatcherSaga', () => {
    const genWatcher = watcherSaga();
    const genWatchFetchNews = watchFetchNews();
    const genWatchFetchMoreNews = watchFetchMoreNews();
    const genWatchFilteredNews = watchFilteredNews();
    it('should run watcher saga', () => {
        expect(genWatcher.next().value).toEqual(all([fork(watchFetchNews), fork(watchFetchMoreNews), fork(watchFilteredNews)]));
    });
    it('should wait for latest action NEWS_FETCH_REQUESTED', () => {
        expect(genWatchFetchNews.next().value).toEqual(takeLatest("NEWS_FETCH_REQUESTED", fetchNews));
    });
    it('should wait for latest action NEWS_FETCH_REQUESTED', () => {
    const genWatchFetchMoreNews = watchFetchMoreNews();
        expect(genWatchFetchMoreNews.next().value).toEqual(takeLatest("NEWS_FETCH_MORE_REQUESTED", fetchNews));
    });
    it('should wait for latest action NEWS_FETCH_REQUESTED', () => {
        expect(genWatchFilteredNews.next().value).toEqual(takeLatest("FILTERED_NEWS", fetchFilteredNews));
    });
});
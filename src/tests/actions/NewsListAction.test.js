import fetchMock from 'fetch-mock';
import "regenerator-runtime/runtime";
import { apiMiddleware, ApiError } from 'redux-api-middleware';
import configureMockStore from 'redux-mock-store';
import reducer, {initialState} from '../../shared/reducers';
import actions from '../../shared/actions/NewsListAction';
import newsListActionTypes from '../../shared/actionsTypes/NewsListActionTypes';

const createStore = configureMockStore([apiMiddleware])
const store = createStore(initialState);

describe.only('Newslist actions', () => {
    const response = [
        {
            author:"jedimind",
            commentsCount:36,
            createdAt:"2020-04-04T15:21:01.000Z",
            isUpvoted: false,
            objectID: "22778742",
            points: 83,
            title: "Apple's treatment of Developers is neither fair nor consistent",
            url: "https://www.theverge.com/2020/4/3/21206400/apple-tax-amazon-tv-prime-30-percent-developers",
        }
    ];
    afterEach(() => {
        store.clearActions();
        fetchMock.reset();
    })
    it('Should dispatch NEWS_FETCH_REQUESTED to fetch news', () => {
        const expectedActions = [
            { type: newsListActionTypes.NEWS_FETCH_REQUESTED},
        ];
        store.dispatch(actions.getNews());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should dispatch NEWS_FETCH_SUCCESS after fetch news call success', async () => {
        const expectedActions = [
            { type: newsListActionTypes.NEWS_FETCH_REQUESTED},
            { type: newsListActionTypes.NEWS_FETCH_SUCCESS, payload: { news: response}}
        ];
        store.dispatch(actions.getNews());
        fetchMock.getOnce('/search', {news: response})
        await fetch('/search').then((data) => {
            return data.json();
        }).then((data) => {
            store.dispatch(actions.getNewsSuccess(data));
        })
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should dispatch NEWS_FETCH_FAIL when fetch news call fails', async () => {
        const expectedActions = [
            { type: newsListActionTypes.NEWS_FETCH_REQUESTED},
            { type: newsListActionTypes.NEWS_FETCH_FAIL, payload: {error: 'API FAIL'}}
        ];
        store.dispatch(actions.getNews());
        fetchMock.getOnce('/search', 500); // Failing api call
        await fetch('/search').then((data) => {
            return data.json();
        }).then((data) => {
            store.dispatch(actions.getNewsSuccess(data));
        }).catch(function(e) {
            store.dispatch(actions.getNewsFail({error: 'API FAIL'}));
        });
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should dispatch NEWS_FETCH_SUCCESS after fetch more news call success', async () => {
        const expectedActions = [
            { type: newsListActionTypes.NEWS_FETCH_MORE_REQUESTED},
            { type: newsListActionTypes.NEWS_FETCH_SUCCESS, payload: { news: response}}
        ];
        store.dispatch(actions.getMoreNews());
        fetchMock.getOnce('/search', {news: response})
        await fetch('/search').then((data) => {
            return data.json();
        }).then((data) => {
            store.dispatch(actions.getNewsSuccess(data));
        })
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should dispatch FILTERED_NEWS_SUCCESS after fetch filtered news call success', async () => {
        const expectedActions = [
            { type: newsListActionTypes.FILTERED_NEWS},
            { type: newsListActionTypes.FILTERED_NEWS_SUCCESS, payload: { news: response}}
        ];
        store.dispatch(actions.filteredNews());
        fetchMock.getOnce('/search', {news: response})
        await fetch('/search').then((data) => {
            return data.json();
        }).then((data) => {
            store.dispatch(actions.getFilteredNewsSuccess(data));
        })
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should dispatch UP_VOTE_POST  when post is voted', () => {
        const expectedActions = [
            { type: newsListActionTypes.UP_VOTE_POST},
        ];
        store.dispatch(actions.upVotePost());
        expect(store.getActions()).toEqual(expectedActions);
    });
});
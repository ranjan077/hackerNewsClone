import newsListActionTypes from '../actionsTypes/NewsListActionTypes';


const getNews = () => ({
    type: newsListActionTypes.NEWS_FETCH_REQUESTED
});

const getNewsSuccess = (payload) => {
    return {
        type: newsListActionTypes.NEWS_FETCH_SUCCESS,
        payload,
    }
}

const getNewsFail = (payload) => ({
    type: newsListActionTypes.NEWS_FETCH_FAIL,
    payload
});

const getMoreNews = (payload) => ({
    type: newsListActionTypes.NEWS_FETCH_MORE_REQUESTED,
    payload,
});

const actions = {
    getNews,
    getNewsSuccess,
    getNewsFail,
    getMoreNews,
};
export default actions;

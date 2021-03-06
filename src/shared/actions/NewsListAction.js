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

const upVotePost = (payload) => ({
    type: newsListActionTypes.UP_VOTE_POST,
    payload
});

const filteredNews = (payload) => ({
    type: newsListActionTypes.FILTERED_NEWS,
    payload
});

const getFilteredNewsSuccess = (payload) => {
    return {
        type: newsListActionTypes.FILTERED_NEWS_SUCCESS,
        payload,
    }
}

const actions = {
    getNews,
    getNewsSuccess,
    getNewsFail,
    getMoreNews,
    upVotePost,
    filteredNews,
    getFilteredNewsSuccess,
};
export default actions;

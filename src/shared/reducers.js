

// Reducer
export const initialState = {news: []};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'NEWS_FETCH_SUCCESS':
      return {news: [...state.news,...action.payload]};
    case 'FILTERED_NEWS_SUCCESS': 
      return {news: [...action.payload]};
    case 'UP_VOTE_POST': {
        const votedPost = state.news.find((post) => {
          return post.objectID === action.payload;
        });
        if(votedPost) {
          votedPost.points = votedPost.points + 1;
          votedPost.isUpvoted = true;
        }
      return {news: [...state.news]}; 
    }
      
    default:
      return state;
  }
}


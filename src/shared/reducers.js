

// Reducer
export default function reducer(state = {news: []}, action) {
  switch (action.type) {
    case 'NEWS_FETCH_SUCCESS':
      // return { ...state, news: action.payload };
      return {news: [...state.news,...action.payload]};

    default:
      return state;
  }
}


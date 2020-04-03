import "isomorphic-fetch";
const Api = {
    fetchNews: (params) => {
        let url = 'https://hn.algolia.com/api/v1/search';
        if(params) {
            url = url + `?${params}`;
        }
        return fetch(url).then(
            response => {
                return response.json()
            }
        )
        .catch(err => {
            throw err
        });
    }
}
export default Api;
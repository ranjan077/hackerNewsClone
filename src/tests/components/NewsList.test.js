import React from 'React';
import NewsList from '../../shared/components/NewsList';
import Post from '../../shared/components/Post';
import { shallow } from 'Enzyme';

describe('Post component', () => {
    let wrapper;
    beforeEach(() => {
        const post = {
            author:"jedimind",
            commentsCount:36,
            createdAt:"2020-04-04T15:21:01.000Z",
            isUpvoted: false,
            objectID: "22778742",
            points: 83,
            title: "Apple's treatment of Developers is neither fair nor consistent",
            url: "https://www.theverge.com/2020/4/3/21206400/apple-tax-amazon-tv-prime-30-percent-developers",
        }
        wrapper = shallow(<NewsList news={[post]} />);
    });

    it('Should render with out errors', () => {
        expect(wrapper.find('.newslist').length).toBe(1);
    });

    it('Should render Post componets', () => {
        expect(wrapper.find(Post).length).toBe(1);
    });
});
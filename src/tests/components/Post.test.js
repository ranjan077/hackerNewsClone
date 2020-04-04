import React from 'React';
import Post from '../../shared/components/Post';
import { shallow } from 'Enzyme';

describe('Post component', () => {
    it('Should render with out errors', () => {
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
        const wrapper = shallow(<Post post={post}/>);
        expect(wrapper.find('.postContainer').length).toBe(1);
    });
});
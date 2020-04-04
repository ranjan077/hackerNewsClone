import React from 'React';
import Post from '../../shared/components/Post';
import { shallow } from 'Enzyme';

describe('Post component', () => {
    let wrapper;
    const upVotePost = jest.fn();
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
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
        wrapper = shallow(<Post post={post} index={1} upVotePost={upVotePost}/>);
    });

    it('Should render with out errors', () => {
        expect(wrapper.find('.postContainer').length).toBe(1);
    });

    it('Should call upVotePost function on click of up vote button', () => {
        wrapper.find('.votearrow-btn').at(0).simulate('click');
        expect(upVotePost).toBeCalled();
    });

    it('Should call setHide hook on  hide button click', () => {
        wrapper.find('.hide-btn').at(0).simulate('click');
        expect(setState).toBeCalled();
    });

});
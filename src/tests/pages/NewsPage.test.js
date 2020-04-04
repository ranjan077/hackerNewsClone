import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'Enzyme';
import NewsPageConnected from '../../shared/pages/index.js';
import { NewsPage } from '../../shared/pages/index.js';

describe('Post component', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const post = {
        author:"jedimind",
        commentsCount:36,
        createdAt:"2020-04-04T15:21:01.000Z",
        isUpvoted: false,
        objectID: "22778742",
        points: 83,
        title: "Apple's treatment of Developers is neither fair nor consistent",
        url: "https://www.theverge.com/2020/4/3/21206400/apple-tax-amazon-tv-prime-30-percent-developers",
    };
    const store = mockStore({
        news: [post],
    });
    const actions = {
        getMoreNews: jest.fn(),
    }
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <NewsPageConnected />
            </Provider>
        );
    });

    it('Should render with out errors', () => {
        expect(wrapper.find('.mainContainer').length).toBe(1);
    });
    
    it('Should call getMoreNews action on click of more button', () => {
        wrapper = shallow(
            <NewsPage news={[post]} actions={actions}/>
        );
        wrapper.find('.more-btn').at(0).simulate('click');
        expect(actions.getMoreNews).toBeCalled();
    });
});
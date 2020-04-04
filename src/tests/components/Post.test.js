import React from 'React';
import Post from '../../shared/components/Post';
import { shallow } from 'Enzyme';

describe('Post component', () => {
    it('Should render Post', () => {
        const wrapper = shallow(<Post />);
    });
});
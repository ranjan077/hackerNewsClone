import React from 'React';
import Filter from '../../shared/components/Filter';
import { shallow } from 'Enzyme';

describe('Filter component', () => {
    const actions = {
        filteredNews: jest.fn(),
    };
    const wrapper = shallow(<Filter {...actions}/>);
    const filteredNews = jest.fn();
    
    it('Should render with out errors', () => {
        expect(wrapper.find('.filterConatiner').length).toBe(1);
    });

    it('Should call filteredNews function on click of New button', () => {
        wrapper.find('.new-btn').at(0).simulate('click');
        expect(actions.filteredNews).toBeCalled();
    });
});
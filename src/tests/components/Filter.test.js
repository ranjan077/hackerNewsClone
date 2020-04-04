import React from 'React';
import Filter from '../../shared/components/Filter';
import { shallow } from 'Enzyme';

describe('Filter component', () => {
    it('Should render with out errors', () => {
        const actions = {
            filteredNews: () => {},
        }
        const wrapper = shallow(<Filter {...actions}/>);
        expect(wrapper.find('.filterConatiner').length).toBe(1);
    });
});
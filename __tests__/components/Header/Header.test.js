import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { createShallow } from '@material-ui/core/test-utils';
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../../src/utils/test/index';
import Header from '../../../src/components/Header/Header';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { setupShallow, setupMount } = setupDefault();

describe('Component/Header', () => {
  describe('Header', () => {
    const wrapper = setupShallow(Header, { dive: true });

    test('render Header Container', () => {
      const container = findByAttr(wrapper, 'header-container');
      expect(container.length).toBe(1);
    });

    test('render Header AppBar', () => {
      const appBar = findByAttr(wrapper, 'app-bar');
      expect(appBar.length).toBe(1);
    });

    test('render Toolbar', () => {
      const toolbar = findByAttr(wrapper, 'toolbar');
      expect(toolbar.length).toBe(1);
    });

    test('render header label', () => {
      const headerLabel = findByAttr(wrapper, 'header-label');
      expect(headerLabel.length).toBe(1);
    });

    test('no calendar by default', () => {
      const calendar = findByAttr(wrapper, 'calendar');
      expect(calendar.length).toBe(0);
    });
  });

  describe('Mount Header no title', () => {
    const { wrapper, dismountWrapper } = setupMount(Header);

    test('render no text', () => {
      const headerLabel = findBySelectorAttr(
        wrapper,
        'Typography',
        'header-label'
      );
      expect(headerLabel.text()).toEqual('');
    });

    dismountWrapper();
  });

  describe('Mount Header with title', () => {
    const { wrapper, dismountWrapper } = setupMount(Header, {
      title: 'Institutional Client Accounts'
    });

    test('render text', () => {
      const headerLabel = findBySelectorAttr(
        wrapper,
        'Typography',
        'header-label'
      );
      expect(headerLabel.text()).toEqual('Institutional Client Accounts');
    });

    dismountWrapper();
  });

  describe('show calendar', () => {
    const wrapper = setupShallow(
      Header,
      { dive: true },
      { showCalendar: true }
    );

    test('render calendar', () => {
      const calendar = findByAttr(wrapper, 'calendar');
      expect(calendar.length).toBe(1);
    });
  });

  /* <Header>child</Header> */
  describe('<Header>child</Header>', () => {
    let shallow;

    beforeEach(() => {
      shallow = createShallow({
        dive: true
      });
    });

    test('render child', () => {
      const wrapper = shallow(
        <Header>
          <div data-test="child">child</div>
        </Header>
      );
      const child = wrapper.find('[data-test="child"]');
      expect(child.length).toBe(1);
    });
  });
});

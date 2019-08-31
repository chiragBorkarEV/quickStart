import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {
  setupDefault,
  findByAttr,
  findBySelectorAttr
} from '../../../src/utils/test/index';
import ButtonPanel from '../../../src/components/ButtonPanel/ButtonPanel';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const buttons = [
  {
    name: 'mtd',
    label: 'MTD'
  },
  {
    name: 'qtd',
    label: 'QTD'
  },
  {
    name: 'fytd',
    label: 'FYTD'
  },
  {
    name: '1year',
    label: '1Y'
  }
];

const { setupShallow, setupMount } = setupDefault({ buttons: [] });

describe('Component/ButtonPanel', () => {
  /* <ButtonPanel /> */
  describe('ButtonPanel', () => {
    const wrapper = setupShallow(ButtonPanel, { dive: true });

    test('render ButtonPanel container', () => {
      const container = findByAttr(wrapper, 'button-panel-container');
      expect(container.length).toBe(1);
    });
  });

  /* <ButtonPanel buttons={ buttons } /> */
  describe('ButtonPanel with buttons', () => {
    const wrapper = setupShallow(ButtonPanel, { dive: true }, { buttons });

    test('render 4 Buttons', () => {
      const button = wrapper.find(
        `[data-test="button"][selected-test="false"][variant="contained"][size="small"][color="primary"][disableRipple=true]`
      );
      expect(button.length).toBe(4);
    });

    test('render 4 button labels', () => {
      const buttonLabel = wrapper.find(
        `[data-test="button-label"][variant="body2"]`
      );
      expect(buttonLabel.length).toBe(4);
    });
  });

  /* <ButtonPanel buttons={ buttons } initialSelections={ ['fytd'] } */
  describe('ButtonPanel with buttons and initialSelections', () => {
    const wrapper = setupShallow(
      ButtonPanel,
      { dive: true },
      { buttons, initialSelections: ['fytd'] }
    );

    test('selectedState should have "fytd"', () => {
      const selectedButtons = wrapper.state('selectedButtons');
      expect(selectedButtons).toEqual(['fytd']);
    });
  });

  /* <ButtonPanel buttons={ buttons }
      toggle={ true }
      initialSelections={ ['fytd'] } */
  describe('ButtonPanel with buttons, initialSelection, and toggle mode enabled', () => {
    const wrapper = setupShallow(
      ButtonPanel,
      { dive: true },
      { buttons, initialSelections: ['fytd'], toggle: true }
    );

    test('selectedState should have "fytd"', () => {
      const selectedButtons = wrapper.state('selectedButtons');
      expect(selectedButtons).toEqual(['fytd']);
    });
  });

  /* <ButtonPanel buttons={ buttons } initialSelections={ ['fytd', 'mtd'] } */
  describe('ButtonPanel with buttons and 2 initialSelections', () => {
    const wrapper = setupShallow(
      ButtonPanel,
      { dive: true },
      { buttons, initialSelections: ['fytd', 'mtd'] }
    );

    test('selectedState should have "fytd"', () => {
      const selectedButtons = wrapper.state('selectedButtons');
      expect(selectedButtons).toEqual(['fytd']);
    });
  });

  /* <ButtonPanel buttons={ buttons }
      toggle={ true }
      initialSelections={ ['fytd', 'mtd'] } */
  describe('ButtonPanel with buttons, 2 initialSelections, and toggle mode enabled', () => {
    const wrapper = setupShallow(
      ButtonPanel,
      { dive: true },
      { buttons, initialSelections: ['fytd', 'mtd'], toggle: true }
    );

    test('selectedState should have ["fytd", "mtd"]', () => {
      const selectedButtons = wrapper.state('selectedButtons');
      expect(selectedButtons).toEqual(['fytd', 'mtd']);
    });
  });

  /* Mount <ButtonPanel buttons={ buttons } /> */
  describe('mount ButtonPanel with buttons', () => {
    const { wrapper, dismountWrapper } = setupMount(ButtonPanel, { buttons });

    test('render button label text', () => {
      const buttonLabel = findBySelectorAttr(
        wrapper,
        'Typography',
        'button-label'
      );
      const buttonLabels = buttonLabel.map(node => node.text());
      expect(buttonLabels).toEqual(['MTD', 'QTD', 'FYTD', '1Y']);
    });

    dismountWrapper();
  });

  /* <ButtonPanel buttons={ buttons } /> Click Test */
  describe('ButtonPanel with buttons', () => {
    const wrapper = setupShallow(ButtonPanel, { dive: true }, { buttons });

    test('set button state to "fytd" when select', () => {
      const fytdButton = findByAttr(wrapper, 'button').at(2);
      fytdButton.simulate('click');
      wrapper.update();
      const newState = wrapper.state('selectedButtons');
      expect(newState).toEqual(['fytd']);
    });

    test('keep "fytd" state when press same button', () => {
      const fytdButton = findByAttr(wrapper, 'button').at(2);
      fytdButton.simulate('click');
      wrapper.update();
      const newState = wrapper.state('selectedButtons');
      expect(newState).toEqual(['fytd']);
    });

    test('change state to "qtd" when pressed', () => {
      const qytdButton = findByAttr(wrapper, 'button').at(1);
      qytdButton.simulate('click');
      wrapper.update();
      const newState = wrapper.state('selectedButtons');
      expect(newState).toEqual(['qtd']);
    });
  });

  /* <ButtonPanel buttons={ buttons } toggle={ true } /> Click Test */
  describe('ButtonPanel with buttons and toggle mode', () => {
    const wrapper = setupShallow(
      ButtonPanel,
      { dive: true },
      { buttons, toggle: true }
    );
    const fytdButton = findByAttr(wrapper, 'button').at(2);
    const mtdButton = findByAttr(wrapper, 'button').at(0);

    test('set button state to "fytd" when selected', () => {
      fytdButton.simulate('click');
      wrapper.update();
      const selectedState = wrapper.state('selectedButtons');
      expect(selectedState).toEqual(['fytd']);
    });

    test('deselect "fytd"', () => {
      fytdButton.simulate('click');
      wrapper.update();
      const selectedState = wrapper.state('selectedButtons');
      expect(selectedState).toEqual([]);
    });

    test('select "fytd" then "mtd"', () => {
      fytdButton.simulate('click');
      mtdButton.simulate('click');
      wrapper.update();
      const selectedState = wrapper.state('selectedButtons');
      expect(selectedState).toEqual(['fytd', 'mtd']);
    });
  });

  /* <ButtonPanel buttons={ buttons } onClick=func /> Function test */
  describe('ButtonPanel with buttons and click fucntion', () => {
    test('click should execute clickFunction and return button name and current state', done => {
      const clickFunction = (name, state) => {
        expect(name).toEqual('fytd');
        expect(state).toEqual(['fytd']);
        done();
      };

      const wrapper = setupShallow(
        ButtonPanel,
        { dive: true },
        { buttons, onClick: clickFunction }
      );

      const fytdButton = findByAttr(wrapper, 'button').at(2);
      fytdButton.simulate('click');
    });
  });
});

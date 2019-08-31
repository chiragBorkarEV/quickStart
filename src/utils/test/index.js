import sinon from 'sinon';
import React from 'react'
import { createShallow, createMount } from '@material-ui/core/test-utils'

const mergeWithDefault = (incomingProps = {}, defaultProps) => {
  return Object.keys(defaultProps).reduce((acc, key) => {
    if (Object.keys(incomingProps).indexOf(key) === -1) {
      return {
        ...acc,
        [key]: defaultProps[key]
      }
    } else return acc
  }, incomingProps)
}

const setupDefault = (defaultProps = {}, defaultState = {}) => {
  return {

    setupShallow: (Component, options = {}, incomingProps, incomingState) => {
      const props = mergeWithDefault(incomingProps, defaultProps)
      const state = mergeWithDefault(incomingState, defaultState)

      const shallow = createShallow(options)

      const wrapper = shallow(<Component { ...props } />)
      if (state) {
        if (Object.keys(state).length > 0) wrapper.setState(state)
      }
      return wrapper
    },

    setupMount: (Component, incomingProps, incomingState) => {
      const props = mergeWithDefault(incomingProps, defaultProps)
      const state = mergeWithDefault(incomingState, defaultState)

      const mount = createMount()

      const wrapper = mount(<Component { ...props } />)
      if (state) {
        if (Object.keys(state).length > 0) wrapper.setState(state, () => {
          console.log(wrapper.debug())
        })
      }

      return {
        wrapper,
        dismountWrapper: () => { mount.cleanUp() }
      }
    }
  }
}

const findByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

const findBySelectorAttr = (wrapper, selector, val) => {
  return wrapper.find(`${selector}[data-test="${val}"]`);
}

const testRender = (wrapper, {
  dataTest = null,
  component = '',
  otherAttrs = '',
  noOfElements = 1
} = {}) => {
  const testAttr = dataTest ? `[data-test="${dataTest}"]` : ''

  const testString = `${component}${testAttr}${otherAttrs}`

  const el = wrapper.find(testString)
  expect(el.length).toBe(noOfElements)
}

const testTextValue = (wrapper, {
  dataTest = null,
  component = '',
  value = ''
} = {}) => {
  const testAttr = dataTest ? `[data-test="${dataTest}"]` : ''
  const testString = `${component}${testAttr}`

  const el = wrapper.find(testString)
  const elTextArray = el.map(node => node.text())
  expect(elTextArray).toEqual(value)
}

const testStyles = (wrapper, {
  dataTest = null,
  component = '',
  styles = []
} = {}) => {
  const testAttr = dataTest ? `[data-test="${dataTest}"]` : ''
  const testString = `${component}${testAttr}`

  const el = wrapper.find(testString)

  const elsWithStyle = el.map((node, i) => ({
    node,
    style: styles[i]
  }))

  elsWithStyle.forEach(el => {
    const nodeStyle = el.node.prop('style')

    const key = Object.keys(el.style)
    expect(nodeStyle).toHaveProperty(key, el.style[key])
  })
}

function stubConsoleError() {
  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });
}

export {
  setupDefault,
  findByAttr,
  findBySelectorAttr,
  testRender,
  testTextValue,
  testStyles,
  stubConsoleError
}

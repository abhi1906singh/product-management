// InputBox.spec.js
import { mount } from '@vue/test-utils'
import InputBox from '../components/InputBox.vue'

describe('InputBox', () => {
  it('renders text input by default', () => {
    const wrapper = mount(InputBox, {
      props: { label: 'Test Input' }
    })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('renders textarea when type is textarea', () => {
    const wrapper = mount(InputBox, {
      props: { type: 'textarea', label: 'Description' }
    })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('renders number input when type is number', () => {
    const wrapper = mount(InputBox, {
      props: { type: 'number', label: 'Price' }
    })
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  it('emits update event on input', async () => {
    const wrapper = mount(InputBox)
    const input = wrapper.find('input')
    await input.setValue('test value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test value'])
  })

  it('shows error message when error prop is true', () => {
    const wrapper = mount(InputBox, {
      props: { error: true, errorMessage: 'This field is required' }
    })
    expect(wrapper.find('.error-message').text()).toBe('This field is required')
    expect(wrapper.find('input').classes()).toContain('is-invalid')
  })

  it('shows character counter for textarea with length prop', () => {
    const wrapper = mount(InputBox, {
      props: { type: 'textarea', length: 150, modelValue: 'Test' }
    })
    expect(wrapper.find('small').text()).toContain('146 characters remaining')
  })
})
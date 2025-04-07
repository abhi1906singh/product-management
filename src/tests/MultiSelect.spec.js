import { mount } from '@vue/test-utils'
import MultiSelect from '../components/MultiSelect.vue'

const testOptions = [
  { id: 1, value: 'red', label: 'Red' },
  { id: 2, value: 'blue', label: 'Blue' }
]

describe('MultiSelect', () => {
  it('renders checkbox options correctly', async () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options: testOptions,
        name: 'test-name', // Added required name prop
        modelValue: [] // Initialize modelValue
      }
    })

    await wrapper.vm.$nextTick() // Wait for DOM updates

    // Find labels within each radio-option div
    const labels = wrapper.findAll('.radio-option label')
    expect(labels[0].text()).toBe('Red')
    expect(labels[1].text()).toBe('Blue')
  })

  it('emits update event when checkbox is toggled', async () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options: testOptions,
        name: 'test-name',
        modelValue: []
      }
    })

    await wrapper.find('input[value="red"]').setValue(true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([['red']])
  })

  it('handles multiple selections', async () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options: testOptions,
        name: 'test-name',
        modelValue: ['red']
      }
    })

    await wrapper.find('input[value="blue"]').setValue(true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([['red', 'blue']])
  })

  it('shows error state when error prop is true', async () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options: testOptions,
        name: 'test-name',
        error: true,
        errorMessage: 'At least one selection is required'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.error-message').text()).toBe('At least one selection is required')
  })
})
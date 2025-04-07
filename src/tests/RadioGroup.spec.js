import { mount } from '@vue/test-utils'
import RadioGroup from '../components/RadioGroup.vue'

const testOptions = [
  { id: 1, value: 'draft', label: 'Draft' },
  { id: 2, value: 'published', label: 'Published' }
]

describe('RadioGroup', () => {
  it('renders radio options correctly', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: testOptions,
        name: 'status',
        modelValue: ''
      }
    })

    // Wait for DOM to render completely
    await new Promise(resolve => setTimeout(resolve, 10))
    
    // Verify all options are rendered
    const options = wrapper.findAll('.radio-option')
    expect(options.length).toBe(testOptions.length)
    
    // Verify each option's label text
    testOptions.forEach((option, index) => {
      const label = options[index].find('label')
      expect(label.text()).toContain(option.label)
    })
  })

  it('emits update event when radio is selected', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: testOptions,
        name: 'status',
        modelValue: ''
      }
    })

    // Select the draft option
    await wrapper.find('input[value="draft"]').setValue(true)
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['draft'])
  })

  it('shows error state when error prop is true', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: testOptions,
        name: 'status',
        modelValue: '',
        error: true,
        errorMessage: 'Selection required'
      }
    })

    // Wait for error state to render
    await wrapper.vm.$nextTick()
    
    // Verify error message exists and has correct text
    const errorMessage = wrapper.find('.error-message')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('Selection required')
    
    // Verify error styling is applied
    expect(wrapper.find('.radio-group').classes()).toContain('is-invalid')
  })

  it('marks the correct option as checked based on modelValue', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: testOptions,
        name: 'status',
        modelValue: 'published'
      }
    })

    // Wait for checked state to update
    await wrapper.vm.$nextTick()
    
    // Verify published is checked and draft isn't
    expect(wrapper.find('input[value="draft"]').element.checked).toBe(false)
    expect(wrapper.find('input[value="published"]').element.checked).toBe(true)
  })
})
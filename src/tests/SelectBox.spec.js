// SelectBox.spec.js
import { mount } from '@vue/test-utils'
import SelectBox from '../components/SelectBox.vue'

const testCategories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' }
]

describe('SelectBox', () => {
  it('renders select element with options', () => {
    const wrapper = mount(SelectBox, {
      props: { categoryData: testCategories, label: 'Category' }
    })
    
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.findAll('option').length).toBe(testCategories.length + 1) // +1 for default option
  })

  it('shows the correct default option label', () => {
    const wrapper = mount(SelectBox, {
      props: { 
        categoryData: testCategories,
        optionLabel: 'Select a category' 
      }
    })
    
    expect(wrapper.find('option:first-child').text()).toBe('Select a category')
  })

  it('emits update event when selection changes', async () => {
    const wrapper = mount(SelectBox, {
      props: { categoryData: testCategories }
    })
    
    await wrapper.find('select').setValue('electronics')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['electronics'])
  })

  it('shows error state when error prop is true', () => {
    const wrapper = mount(SelectBox, {
      props: { 
        error: true,
        errorMessage: 'Category is required' 
      }
    })
    
    expect(wrapper.find('.error-message').text()).toBe('Category is required')
    expect(wrapper.find('select').classes()).toContain('is-invalid')
  })
})
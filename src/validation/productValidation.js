import { required, minLength } from '@vuelidate/validators'
import { helpers } from '@vuelidate/validators'

export const productValidationRules = (form) => ({

  productId:{
    $skipIf: () => true,
  },
  productName: {
    required: helpers.withMessage('Product Name is required', required),
    minLength: helpers.withMessage('Minimum 3 characters required', minLength(3)),
  },
  category: {
    required: helpers.withMessage('Category is required', required),
  },
 customCategory: {
  $skipIf: () => true,
  },
  subCategory: {
    $skipIf: () => true,
  },
  productType: {
    $skipIf: () => true,
  },
  brandName:{
    required: helpers.withMessage('Product Name is required', required),
    minLength: helpers.withMessage('Minimum 3 characters required', minLength(3)),
  },
modelNumber: {
  required: helpers.withMessage('Model number is required', (value) => {
    return form.category !== 'electronics' || !!value?.trim()
  }),
},
  description: {
    required: helpers.withMessage('Product Description is required', required),
  },
  shortDescription: {
    $skipIf: () => true,
  },
 price: {
  required: helpers.withMessage('Price is required', required),
  numeric: helpers.withMessage('Price must be a number', (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }),
  minValue: helpers.withMessage('Price must be positive', (value) => {
    return parseFloat(value) > 0;
  })
},
  currency :{
    required: helpers.withMessage('Currency is required', required),
  },
  discountType:{
    $skipIf: () => true,
  },
discountValue: {
  required: helpers.withMessage('Discount value is required', required),
  numeric: helpers.withMessage('Must be a valid number', (value) => !isNaN(Number(value))),
  validRange: helpers.withMessage(({ $model }) => {
    return form.discountType === 'Percentage' 
      ? `Discount must be between 0-100% (current: ${$model})`
      : `Discount amount must be positive (current: ${$model})`
  }, (value) => {
    const num = Number(value)
    return form.discountType === 'Percentage' 
      ? num >= 0 && num <= 100 
      : num > 0               
  })
},
  taxCategory :{
    required: helpers.withMessage('Tax category is required', required),
  },
  stockQuantity: {
  required: helpers.withMessage('Stock quantity is required', required),
  integer: helpers.withMessage('Stock quantity must be a whole number', (value) => {
    return Number.isInteger(Number(value));
  }),
  minValue: helpers.withMessage('Stock quantity cannot be negative', (value) => {
    return Number(value) >= 0;
  }),
},
  weight: {
    $skipIf: () => true,
  },
  weightUnit: {
    $skipIf: () => true,
  },
  colors: {
    $skipIf: () => true,
  },
  sizes: {
    $skipIf: () => true,
  },
  material: {
    $skipIf: () => true,
  },
  features:{
    $skipIf: () => true,
  },
  internationalShipping:{
    $skipIf: () => true,
  },
  returnPolicy: {
    $skipIf: () => true,
  },
  warrantyPeriod: {
    $skipIf: () => true,
  },
  images: {
    $skipIf: () => true,
  },
  publicationStatus: {
    $skipIf: () => true,
  },
 publicationDate: {
  requiredIfScheduled: helpers.withMessage(
    'Select today or a future date',
    (value) => {
      if (form.publicationStatus !== 'Scheduled') return true
      if (!value) return false
      
      const selectedDate = new Date(value)
      selectedDate.setHours(0, 0, 0, 0)
      
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }
  ),
  futureDate: helpers.withMessage(
    'Date must be in the future',
    (value) => {
      if (form.publicationStatus !== 'Scheduled') return true
      if (!value) return true ;
      
      const selectedDate = new Date(value)
      const today = new Date()
      return selectedDate > today
    }
  )
}
})

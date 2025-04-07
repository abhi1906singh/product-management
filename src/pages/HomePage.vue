<template>
  <div class="product-form-container">
    <h1 class="form-title">Product Submission Form</h1>
    <form class="product-form" @submit.prevent="handleSubmit">
      <h2>Basic Information</h2>
      <InputBox :disable="true" label="Product ID" :required="true" v-model="form.productId" />
      <InputBox label="Product Name" :required="true" v-model="form.productName"
        :error="v$.productName.$dirty && v$.productName.$error" :errorMessage="v$.productName.$errors[0]?.$message"
        @blur="v$.productName.$touch()" @clearError="v$.productName.$reset()" />
        <SelectBox 
          :categoryData="categories" 
          label="Product Category" 
          optionLabel="Select a category"
          v-model="form.category" 
          :required="true"
          :error="v$.category.$error"
          :errorMessage="v$.category.$errors[0]?.$message"
          @blur="v$.category.$touch()"
          @clearError="v$.category.$reset()"
            />
      <div v-if="form.category === 'other'">
        <InputBox v-model="form.customCategory" label="Other"/>
      </div>
      <SelectBox v-if="form.category && form.category !== 'other'" :categoryData="availableSubCategories" 
          label="Sub-Category" optionLabel="Select a sub-category"v-model="form.subCategory" 
          :error="v$.subCategory.$error" :errorMessage="v$.subCategory.$errors[0]?.$message"
          @blur="v$.subCategory.$touch()"@clearError="v$.subCategory.$reset()":form-submitted="formSubmitted"/>
        <RadioGroup v-if="form.subCategory" label="Product Type" :options="availableProductTypes" name="productType"
          v-model="form.productType" :error="v$.productType.$error" :errorMessage="v$.productType.$errors[0]?.$message"
          :form-submitted="formSubmitted" @blur="v$.productType.$touch()"@clearError="v$.productType.$reset()"
          @touched="v$.productType.$touch()"
        />
        <InputBox label="Brand Name" :required="true" v-model="form.brandName"
        :error="v$.brandName.$dirty && v$.brandName.$error" :errorMessage="v$.brandName.$errors[0]?.$message"
        @blur="v$.brandName.$touch()" @clearError="v$.brandName.$reset()"/>

        <!-- <InputBox label="Model Number" :required="true" v-model="form.modelNumber" v-if="form.category === 'electronics'"
        :error="v$.modelNumber.$dirty && v$.modelNumber.$error" :errorMessage="v$.modelNumber.$errors[0]?.$message"
        @blur="v$.modelNumber.$touch()" @clearError="v$.modelNumber.$reset()"/> -->
        <div v-if="form.category === 'electronics'" class="form-group">
  <label for="modelNumber">
    Model Number <span class="required">*</span>
  </label>
  <input
    type="text"
    id="modelNumber"
    v-model="form.modelNumber"
    @blur="v$.modelNumber?.$touch()" 
    @input="v$.modelNumber?.$touch()"
    :class="{ 'is-invalid': modelNumberValidation.hasError }"
    class="form-control"
  />
  <div v-if="modelNumberValidation.hasError" class="error-message">
    {{ modelNumberValidation.message }}
  </div>
</div>
        
        <InputBox label="Product Description"  type="textarea" :required="true" v-model="form.description"
        :error="v$.description.$dirty && v$.description.$error" :errorMessage="v$.description.$errors[0]?.$message"
        @blur="v$.description.$touch()" @clearError="v$.description.$reset()"/>
        <InputBox label="Short Description"  type="textarea" :length="length"  v-model="form.shortDescription"
        :error="v$.shortDescription.$dirty && v$.shortDescription.$error" :errorMessage="v$.shortDescription.$errors[0]?.$message"
        @blur="v$.shortDescription.$touch()" @clearError="v$.shortDescription.$reset()"/>
        <InputBox label="Price"  v-model="form.price"
        :error="v$.price.$dirty && v$.price.$error" :errorMessage="v$.price.$errors[0]?.$message" :required="true"
        @blur="v$.price.$touch()" @clearError="v$.price.$reset()"/>
        <SelectBox  :categoryData="currencies" 
          label="Currency" optionLabel="Select currency"v-model="form.currency" :required="true"
          :error="v$.currency.$error" :errorMessage="v$.currency.$errors[0]?.$message"
          @blur="v$.currency.$touch()"@clearError="v$.currency.$reset()":form-submitted="formSubmitted"/>
          <RadioGroup
          v-if="form.discountType"
          label="Discount Type "
          :options="discountType"
          name="discountType"
          v-model="form.discountType"
          :error="v$.discountType.$error"
          :errorMessage="v$.discountType.$errors[0]?.$message"
          :form-submitted="formSubmitted"
          @blur="v$.discountType.$touch()"
          @clearError="v$.discountType.$reset()"
          @touched="v$.discountType.$touch()"
        />
        <InputBox
            v-if="form.discountType === 'Percentage' || form.discountType === 'Fixed Amount'"
            :label="form.discountType === 'Percentage' ? 'Discount Percentage (%)' : 'Discount Amount'"
            v-model="form.discountValue"
            type="number"
            :min="form.discountType === 'Percentage' ? 0 : 0.01"
            :max="form.discountType === 'Percentage' ? 100 : undefined"
            :step="form.discountType === 'Percentage' ? 1 : 0.01"
            :required="true"
            :error="v$.discountValue.$error"
            :errorMessage="v$.discountValue.$errors[0]?.$message"
            @blur="v$.discountValue.$touch()"
            @clearError="v$.discountValue.$reset()"
          />
        <SelectBox  :categoryData="currencies" 
          label="Tax Category" optionLabel="Select tax category"v-model="form.taxCategory" :required="true"
          :error="v$.taxCategory.$error" :errorMessage="v$.taxCategory.$errors[0]?.$message"
          @blur="v$.taxCategory.$touch()"@clearError="v$.taxCategory.$reset()":form-submitted="formSubmitted"/>
          <InputBox label="Stock Quantity" :required="true" v-model="form.stockQuantity"
        :error="v$.stockQuantity.$dirty && v$.stockQuantity.$error" :errorMessage="v$.stockQuantity.$errors[0]?.$message"
        @blur="v$.stockQuantity.$touch()" @clearError="v$.stockQuantity.$reset()"/>
        
        <div class="form-group">
          <label for="weight">Product Weight</label>
          <div class="input-group">
            <input type="number" id="weight" v-model.number="form.weight" class="form-control" 
            :class="{ 'is-invalid': v$.weight.$error }" min="0" step="0.01"/>
            <select v-model="form.weightUnit" class="form-select">
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
              <option value="oz">oz</option>
            </select>
          </div>
          <div v-if="v$.weight.$error" class="error-message">
            {{ v$.weight.$errors[0].$message }}
          </div>
        </div>
        <MultiSelect
          v-if="form.category === 'electronics' || form.category === 'clothing'"
          label="Available Colors"
          :options="availableColors"
          name="colors"
          v-model="form.colors"
          :error="v$.colors.$error"
          :errorMessage="v$.colors.$errors[0]?.$message"
          @blur="v$.colors.$touch()"
          @clearError="v$.colors.$reset()"
        />
        <MultiSelect
          v-if="form.category === 'clothing' && availableSizes.length"
          label="Available Sizes"
          :options="availableSizes"
          name="sizes"
          v-model="form.sizes"
          :error="v$.sizes.$error"
          :errorMessage="v$.sizes.$errors[0]?.$message"
          @blur="v$.sizes.$touch()"
          @clearError="v$.sizes.$reset()"
        />
        <SelectBox
          v-if="form.category==='clothing' || form.category==='home_garden' "
          label="Material"
          :categoryData="materialOptions"
          optionLabel="Select material"
          v-model="form.material"
          :error="v$.material.$error"
          :errorMessage="v$.material.$errors[0]?.$message"
          @blur="v$.material.$touch()"
          @clearError="v$.material.$reset()"
        />
        <div class="form-group">
          <label>Product Features</label>
          <div class="features-container">
            <div v-for="(feature, index) in form.features" :key="index" class="feature-input">
              <input 
                type="text" 
                v-model="form.features[index]" 
                class="form-control"
                placeholder="Enter a product feature"
              />
              <button 
                type="button" 
                class="btn-remove" 
                @click="removeFeature(index)"
                aria-label="Remove feature"
              >
                ×
              </button>
            </div>
            <button type="button" class="btn-add" @click="addFeature">
              + Add Feature
            </button>
          </div>
        </div>
        <div class="form-group">
    <label>Shipping Options</label>
    <div class="checkbox-group">
      <div v-for="option in shippingData" :key="option.value" class="checkbox-option">
        <input 
          type="checkbox" 
          :id="option.value" 
          :value="option.value" 
          v-model="form.shippingOptions"
          :disabled="option.value === 'next_day' && !isEligibleForNextDay"
        />
        <label :for="option.value" :class="{ 'disabled': option.value === 'next_day' && !isEligibleForNextDay }">
          {{ option.label }}
          <span v-if="option.value === 'next_day'" class="option-note">
            (Only available for products under 5kg)
          </span>
        </label>
      </div>
    </div>
  </div>
  <SelectBox  :categoryData="returnPolicyData" 
          label="Return Policy" optionLabel="Return within"v-model="form.returnPolicy" 
          :error="v$.returnPolicy.$error" :errorMessage="v$.returnPolicy.$errors[0]?.$message"
          @blur="v$.returnPolicy.$touch()"@clearError="v$.returnPolicy.$reset()":form-submitted="formSubmitted"/>

          <InputBox label="Warranty Period" v-model="form.warrantyPeriod" v-if="form.category==='electronics' || form.category==='home_garden' "
        :error="v$.warrantyPeriod.$dirty && v$.warrantyPeriod.$error" :errorMessage="v$.warrantyPeriod.$errors[0]?.$message"
        @blur="v$.warrantyPeriod.$touch()" @clearError="v$.warrantyPeriod.$reset()"/>
        <div class="form-group">
          <label for="productImages">Product Images</label>
          <input 
            type="file" 
            id="productImages" 
            @change="handleImageUpload"
            multiple
            accept="image/jpeg, image/png"
            class="form-control"
            :class="{ 'is-invalid': imageError }"
          />
          <small class="form-text">Upload JPG or PNG images (max 5MB each)</small>
          <div v-if="imageError" class="error-message">
            {{ imageError }}
          </div>
          
          <div v-if="form.images.length > 0" class="image-preview-container">
            <div v-for="(image, index) in form.images" :key="index" class="image-preview">
              <img :src="image.preview" alt="Product preview" />
              <button 
                type="button" 
                class="btn-remove-image" 
                @click="removeImage(index)"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          </div>
        </div>
        <RadioGroup v-if="form.publicationStatus" label="Product Type" :options="publicationStatusData" name="productType"
          v-model="form.publicationStatus" :error="v$.publicationStatus.$error" :errorMessage="v$.publicationStatus.$errors[0]?.$message"
          :form-submitted="formSubmitted" @blur="v$.publicationStatus.$touch()"@clearError="v$.publicationStatus.$reset()"
          @touched="v$.publicationStatus.$touch()"
        />

        <div v-if="form.publicationStatus === 'Scheduled'">
    <div class="label">Publication Date <span class="required">*</span></div>
    <input
      class="date"
      type="date"
      v-model="form.publicationDate"
      @blur="v$.publicationDate?.$touch()"
      :class="{ 'is-invalid': publicationDateError.hasError }"
    />
    <div v-if="publicationDateError.hasError" class="error-message">
      {{ publicationDateError.message }}
    </div>
  </div>
      <button type="submit" class="btn-primary">Submit</button>
      <div v-if="formSubmitted" class="submission-message">
      Data has been submitted successfully!
    </div>
    </form>
  </div>
</template>

<script setup>
import { useCounterStore } from "../store/counterStore.js"
import { v4 as uuidv4 } from 'uuid';
import InputBox from "../components/InputBox.vue"
import SelectBox from "../components/SelectBox.vue";
// const counter = useCounterStore();
import { categories, subCategoriesMap,productTypesMap,currencies,discountType,availableColors,sizesMap,materialOptions } from "../constants/productData.js";
import useVuelidate from '@vuelidate/core'
import { productValidationRules } from '../validation/productValidation.js'
import { computed, nextTick, reactive, ref, toRef, watch } from "vue";
import RadioGroup from "../components/RadioGroup.vue";
import MultiSelect from "../components/MultiSelect.vue";
import { shippingData, useShipping,returnPolicyData,publicationStatusData } from '../constants/useShipping.js';
const form = reactive({
  productId:uuidv4(),
  productName:'',
  category: '',
  customCategory: '',
  subCategory: '',
  productType: '',
  brandName: '',
  modelNumber: '',
  description: '',
  shortDescription: '',
  price: '',
  currency: '',
  discountType: 'Percentage',
  discountValue: '',
  taxCategory: '',
  stockQuantity: '',
  weight: '',
  weightUnit: 'kg',
  dimensions: {
    length: '',
    width: '',
    height: '',
    unit: 'cm'
  },
  colors: [],
  sizes: [],
  material: '',
  features: [''],
  shippingOptions: ['standard'],
  returnPolicy: '',
  warrantyPeriod: '',
  warrantyUnit: 'months',
  images: [],
  tags: [],
  seoKeywords: '',
  publicationStatus: 'draft',
  publicationDate: ''
});
const length=ref(150);
const imageError = ref('');
const formSubmitted = ref(false);
const rules = productValidationRules(form)
const v$ = useVuelidate(rules, form, { $autoDirty: true });
defineExpose({ v$ })
const { isEligibleForNextDay } = useShipping(
  toRef(form, 'weight'),
  toRef(form, 'weightUnit')
);
async function handleSubmit() {
  formSubmitted.value = true;
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.log('Validation failed')
  }
  else {
    console.log('Form submitted:', form)
  }
}

const availableSubCategories = computed(() => {
  console.log(subCategoriesMap[form.category])
  return form.category ? subCategoriesMap[form.category] || [] : [];
});

const availableProductTypes = computed(() => {
  if (!form.subCategory) return [];
  const types = productTypesMap[form.subCategory];  
  return types || []; 
});
const availableSizes = computed(() => {
  if (form.category !== 'clothing' || !form.subCategory) return [];
  const sizeKey = form.subCategory.toLowerCase();
  return sizesMap[sizeKey] || [];
});
const addFeature = () => {
  form.features.push('');
  if (v$.value.features.$error) {
    v$.value.features.$reset();
  }
};
function handleImageUpload(event) {
  const files = event.target.files;
  imageError.value = '';
  if (!files.length) return;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      imageError.value = 'Only JPG and PNG images are allowed';
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      imageError.value = 'Images must be less than 5MB';
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      form.images.push({
        file: file,
        preview: e.target.result
      });
    };
    reader.readAsDataURL(file);
  }
  
  // Reset file input
  event.target.value = '';
}

function removeImage(index) {
  form.images.splice(index, 1);
}
const modelNumberValidation = computed(() => ({
  hasError: v$.value.modelNumber?.$error,
  message: v$.value.modelNumber?.$errors[0]?.$message
}))

const removeFeature = (index) => {
  if (form.features.length > 1) {
    form.features.splice(index, 1);
  }
  v$.value.features.$touch(); 
};
const publicationDateError = computed(() => ({
  hasError: v$.value.publicationDate?.$error,
  message: v$.value.publicationDate?.$errors[0]?.$message
}))
watch(() => form.productName, (newVal) => {
  if (v$.value.productName.$error) {
    v$.value.productName.$reset();
    v$.value.productName.$validate();
  }
});
watch(() => form.category, (newCategory) => {
  form.subCategory = '';
  if (v$.value.subCategory) {
    v$.value.subCategory.$reset();
  }
  
  nextTick(() => {
    if (newCategory && newCategory !== 'other') {
      v$.value.subCategory?.$touch();
    }
  });
});
</script>

<style scoped>
button {
  margin-top: 10px;
}
.date{
  width: 100%;
  padding: 10px;
  font-size: 16px;
}
</style>

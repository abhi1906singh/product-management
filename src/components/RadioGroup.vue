<template>
    <div class="form-group">
      <label class="label">{{ label }} <span class="required" v-if="required">*</span></label>
      <div class="radio-group" :class="{ 'is-invalid': showError }">
        <div v-for="option in options" :key="option.value" class="radio-option">
          <input
            type="radio"
            :id="`${name}_${option.value}`"
            :value="option.value"
            :checked="modelValue === option.value"
            :name="name"
            @change="handleChange(option.value)"
            @blur="handleBlur"
          />
          <label :for="`${name}_${option.value}`">{{ option.label }}</label>
        </div>
      </div>
      <div v-if="showError" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    label: String,
    options: Array, 
    name: String,
    modelValue: [String, Number], 
    required: Boolean,
    error: Boolean,
    errorMessage: String,
    formSubmitted: Boolean
  });
  
  const emit = defineEmits(['update:modelValue', 'blur', 'clearError', 'touched']);
  
  const touched = ref(false);
  const showError = ref(false);
  
  const handleChange = (value) => {
    emit('update:modelValue', value);
    if (!touched.value) {
      touched.value = true;
      emit('touched');
    }
    if (props.error) {
      emit('clearError');
    }
  };
  
  // ... rest of the component remains the same ...
  </script>
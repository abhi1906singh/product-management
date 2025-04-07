<template>
    <div class="form-group">
      <label class="label">
        {{ label }} <span class="required" v-if="required">*</span>
      </label>
      
      <div class="radio-group">
        <div v-for="option in options" :key="option.id" class="radio-option">
          <input
            type="checkbox"
            :id="`${name}-${option.id}`"
            :name="name"
            :value="option.value"
            :checked="isChecked(option.value)"
            @change="handleChange(option.value, $event.target.checked)"
            @blur="$emit('blur')"
            :class="{ 'is-invalid': error }"
          />
          <label :for="`${name}-${option.id}`">{{ option.label }}</label>
        </div>
      </div>
      
      <div v-if="error" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    label: String,
    required: {
      default: false,
      type: Boolean,
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    error: Boolean,
    errorMessage: String,
  });
  
  const emit = defineEmits(['update:modelValue', 'blur', 'clearError']);
  
  const isChecked = (value) => {
    return props.modelValue.includes(value);
  };
  
  const handleChange = (value, isChecked) => {
    let newValue = [...props.modelValue];
    
    if (isChecked) {
      newValue.push(value);
    } else {
      newValue = newValue.filter(item => item !== value);
    }
    
    emit('update:modelValue', newValue);
    
    if (props.error) {
      emit('clearError');
    }
  };
  </script>
  
  <style scoped>
  
  .is-invalid {
    outline: 1px solid red;
  }
  .required {
    color: red;
  }
  </style>
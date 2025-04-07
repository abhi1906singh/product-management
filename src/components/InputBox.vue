<template>
  <div>
    <div class="form-group">
      <label class="label" for="productName">{{ label }} <span class="required" v-if="required">*</span></label>
      
      <!-- Textarea group -->
      <div v-if="type==='textarea'">
        <textarea
          class="form-control"
          :value="modelValue"
          @input="handleInput($event.target.value)"
          :class="{ 'is-invalid': error }"
          @blur="$emit('blur')"
          :maxlength="length"
        ></textarea>
        <small v-if="length" class="text-muted">
          {{ length - (modelValue?.length || 0) }} characters remaining
        </small>
      </div>
      
      <!-- Number input -->
      <input 
        v-else-if="type === 'number'"
        type="number"
        class="form-control"
        :value="modelValue"
        @input="handleNumberInput($event.target.value)"
        :class="{ 'is-invalid': error }"
        @blur="$emit('blur')"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disable"
      />
      
      <!-- Default text input -->
      <input 
        v-else
        type="text"
        id="productId"
        class="form-control"
        :disabled="disable"
        :value="modelValue"
        @input="handleInput($event.target.value)"
        :class="{ 'is-invalid': error }"
        @blur="$emit('blur')"
      />
      
      <div v-if="error" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watchEffect } from 'vue';
const props = defineProps({
  disable: {
    default: false,
    type: Boolean,
  },
  label: String,
  required: {
    default: false,
    type: Boolean,
  },
  modelValue: [String, Number],
  error: Boolean,
  errorMessage: String,
  type: { type: String, default: 'text' },
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  },
  step: {
    type: Number,
    default: null
  },
  length: {
    type: Number
  }
})
const emit = defineEmits(['update:modelValue', 'blur', 'clearError']); 

// const handleInput = (value) => {
//   emit('update:modelValue', value);
//   // if (props.error) {
//   //   emit('clearError');
//   // }
// };
const handleNumberInput = (value) => {
  // Convert to number if possible, otherwise keep as string
  const numValue = value === '' ? null : Number(value);
  emit('update:modelValue', isNaN(numValue) ? value : numValue);
  if (props.error) {
    emit('clearError');
  }
};
const handleInput = (value) => {
  // Add length enforcement for textarea
  if (props.type === 'textarea' && props.length !== undefined) {
    value = value.slice(0, props.length);
  }
  emit('update:modelValue', value);
};

</script>

<style scoped>
.is-invalid {
  border: 1px solid red;
}

.invalid-feedback {
  color: red;
  font-size: 12px;
}
</style>
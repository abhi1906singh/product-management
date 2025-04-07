<template>
  <div class="form-group">
    <label class="label" >{{ label }} <span class="required" v-if="required">*</span></label>
    <select
      :value="modelValue"
      @change="handleChange($event)"
      class="form-control"
      :class="{ 'is-invalid': error }"
      @blur="$emit('blur')"
    >
      <option value="">{{ optionLabel }}</option>
      <option v-for="category in categoryData" :key="category.id" :value="category.value">
        {{ category.label }}
      </option>
    </select>
    <div v-if="error" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categoryData: Array,
  label: String,
  optionLabel: String,
  required: Boolean,
  modelValue: [String, Number],
  error: Boolean,
  errorMessage: String
});

const emit = defineEmits(['update:modelValue', 'blur', 'clearError']);

const handleChange = (event) => {
  emit('update:modelValue', event.target.value);
  if (props.error) {
    emit('clearError');
  }
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
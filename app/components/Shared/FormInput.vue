<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  placeholder?: string;
  modelValue?: string | number;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  modelValue: '',
  error: '',
  required: false,
  disabled: false,
  helpText: '',
  autocomplete: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const inputId = computed(() => `input-${props.id}`);
const errorId = computed(() => `${inputId.value}-error`);
const helpId = computed(() => `${inputId.value}-help`);
</script>

<template>
  <div class="form-group">
    <!-- Label - Always visible (UNICEF compliance) -->
    <label
      :for="inputId"
      class="form-label"
    >
      {{ label }}
      <span
        v-if="required"
        class="required-mark"
        aria-hidden="true"
      >*</span>
    </label>

    <!-- Input Field -->
    <div class="input-wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="error ? errorId : helpText ? helpId : undefined"
        class="form-input"
        :class="{
          'form-input-error': !!error,
          'form-input-disabled': disabled,
        }"
        @input="updateValue"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <!-- Icon slot -->
      <slot name="icon" />
    </div>

    <!-- Error Message - Clear with color AND text (UNICEF compliance) -->
    <p
      v-if="error"
      :id="errorId"
      class="form-error"
      role="alert"
    >
      <UIcon name="i-heroicons-exclamation-circle" class="error-icon" />
      {{ error }}
    </p>

    <!-- Help Text -->
    <p
      v-else-if="helpText"
      :id="helpId"
      class="form-help"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<style scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-semibold text-gray-800;
}

.required-mark {
  @apply text-red-500 ml-1;
}

.input-wrapper {
  @apply relative;
}

.form-input {
  @apply w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500;
  @apply transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-brand-light/30 focus:border-brand-medium;
}

.form-input-error {
  @apply border-red-500 focus:border-red-500 focus:ring-red-500/30;
}

.form-input-error:focus {
  @apply outline-none;
}

.form-input-disabled {
  @apply bg-gray-100 cursor-not-allowed opacity-60;
}

.form-error {
  @apply flex items-center text-sm text-red-600 mt-2;
}

.error-icon {
  @apply w-4 h-4 mr-2 flex-shrink-0;
}

.form-help {
  @apply text-sm text-gray-500 mt-2;
}

/* Screen reader only */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}

/* Success state for forms (UNICEF compliance - success messages must persist) */
.form-input-success {
  @apply border-green-500 focus:border-green-500 focus:ring-green-500/30;
}

.form-success-message {
  @apply flex items-center text-sm text-green-600 mt-2;
}
</style>

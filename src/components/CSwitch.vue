<template>
  <div class="form-check form-switch">
    <input
      :id="id"
      class="form-check-input"
      :class="inputClass"
      type="checkbox"
      :name="name"
      :checked="value"
    />
    <label class="form-check-label" :class="labelClass" :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'CSwitch',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div class="form-check">
    <input
      :id="id" class="form-check-input" type="checkbox"
      :name="name" :checked="checked"
    />
    <label :for="id" class="custom-control-label">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'CCheckbox',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

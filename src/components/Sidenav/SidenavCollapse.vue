<template>
  <router-link
    class="nav-link position-relative" :to="to" v-bind="$attrs"
    :class="{ active: isActive }"
  >
    <div
      class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
      :class="$store.state.isRTL ? ' ms-2' : 'me-2'"
    >
      <slot name="icon" />
    </div>
    <span
      class="nav-link-text"
      :class="$store.state.isRTL ? ' me-1' : 'ms-1'"
    >{{ navText }}
    </span>
    <span
      v-if="navAlertBadge"
      class="position-absolute top-15 end-0 translate-middle badge rounded-pill bg-danger"
    >{{ navAlertBadge }}</span>
  </router-link>
</template>
<script>
export default {
  name: 'SidenavCollapse',
  props: {
    to: {
      type: [Object, String],
      required: true
    },
    navText: {
      type: String,
      required: true
    },
    navAlertBadge: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: false
    }
  }
}
</script>
<style lang="scss">
.nav-link.active {
  background-color: unset !important;
}
</style>

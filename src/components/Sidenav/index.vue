<template>
  <aside
    id="sidenav-main"
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="$store.state.isRTL ? 'me-3 rotate-caret' : 'ms-3'"
    :data-color="sidenavActiveBgColors"
    style="z-index: 99999"
  >
    <div class="sidenav-header">
      <i
        id="iconSidenav"
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
      />
      <a class="navbar-brand" href="/">
        <img
          :src="logo" class="d-inline-block align-text-top" alt="main_logo"
        />
        User management
      </a>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :card-bg="customClass" />
  </aside>
</template>
<script>
import SidenavList from './SidenavList.vue'
import logo from '@/assets/img/nextar/app-logo.png'

export default {
  name: 'IndexComponent',
  components: {
    SidenavList
  },
  props: {
    customClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      logo,
      sidenavActiveBgColors: 'success'
    }
  }
}
</script>

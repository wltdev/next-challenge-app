<script setup>
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'
import SidenavCollapse from './SidenavCollapse.vue'

const route = useRoute()
</script>

<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse
          nav-text="Usuários"
          :to="{ name: 'users' }"
          :is-active="route.path.includes('users')"
        >
          <template #icon>
            <icon name="components" />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>

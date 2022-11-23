<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import VsudAvatar from '@/components/VsudAvatar.vue'
import CSwitch from '@/components/CSwitch.vue'
import img1 from '@/assets/img/default-user.png'

const store = useStore()
const route = useRoute()
const doc = computed(() => store.getters['users/getDoc'])

const getDocByParams = async () => {
  if (!doc.value.uid) {
    await store.dispatch('users/getDocByUid', route.params.uid)
  }
}

onMounted(() => {
  if (!doc.value.uid) {
    getDocByParams()
  }
})

const setAdmin = async (admin) => {
  const permission = admin ? 'admin' : 'standard'
  await store.dispatch('users/updateDoc', { permission })
}

</script>

<template>
  <div v-if="doc._id" class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="card mb-4">
          <div class="card-header pb-0 position-relative">
            <div class="last-signin">
              <CSwitch :value="doc.permission === 'admin'" @click="(e) => setAdmin(e.target.checked)">
                Administrador
              </CSwitch>
            </div>
            <div class="mb-4 d-flex align-items-center">
              <vsud-avatar
                :img="doc.photo || img1"
                size="xxl"
                class="me-3"
                alt="user1"
              />
              <div class="d-flex flex-column">
                <h4 class="mb-0">
                  {{ doc.name }}
                </h4>
                <span class="text-xs text-secondary mt-0">
                  {{ doc.email }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.last-signin {
  position: absolute;
  right: 48px;
}
</style>

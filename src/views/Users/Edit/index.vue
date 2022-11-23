<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import VsudAvatar from '@/components/VsudAvatar.vue'
import CSwitch from '@/components/CSwitch.vue'
import VsudInput from '@/components/VsudInput.vue'
import VsudButton from '@/components/VsudButton.vue'
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

const _updateUser = async () => {
  await store.dispatch('users/updateDoc', doc.value)
}

</script>

<template>
  <div v-if="doc._id" class="container-fluid">
    <div class="row">
      <div class="col-8">
        <div class="card mb-4">
          <div class="card-header pb-0 position-relative">
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
          <div class="p-3 card-body">
            <div class="">
              <CSwitch :value="doc.permission === 'admin'" @click="(e) => setAdmin(e.target.checked)">
                Administrador
              </CSwitch>
            </div>
            <form role="form" class="text-start" @submit.prevent="_updateUser">
              <div class="row">
                <div class="col">
                  <label>Name</label>
                  <VsudInput
                    v-model:value="doc.name"
                    icon="fa fa-user"
                    icon-dir="left"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                </div>

                <div class="col">
                  <label>Phone</label>
                  <VsudInput
                    v-model:value="doc.phone"
                    icon="fa fa-phone"
                    icon-dir="left"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                </div>
              </div>

              <!-- <div class="row">
                <div class="col">
                  <label>Password</label>
                  <VsudInput
                    v-model:value="doc.password"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div class="col">
                  <label>Password confirmation</label>
                  <VsudInput
                    v-model:value="doc.password"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
              </div> -->

              <!-- <vsud-switch id="rememberMe" checked>Lembrar dados</vsud-switch> -->
              <div class="text-center">
                <VsudButton
                  class="my-4 mb-2"
                  variant="gradient"
                  color="info"
                  full-width
                >
                  Save
                </VsudButton>
              </div>
            </form>
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

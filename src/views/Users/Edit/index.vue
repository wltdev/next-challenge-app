<script setup>
import { onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { createToaster } from '@meforma/vue-toaster'
import VsudAvatar from '@/components/VsudAvatar.vue'
import CSwitch from '@/components/CSwitch.vue'
import VsudInput from '@/components/VsudInput.vue'
import VsudButton from '@/components/VsudButton.vue'
import img1 from '@/assets/img/default-user.png'

const store = useStore()
const route = useRoute()
const doc = computed(() => store.getters['users/getDoc'])

const toast = createToaster()
const state = reactive({
  errors: []
})

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
  try {
    const permission = admin ? 'admin' : 'standard'
    await store.dispatch('users/updateDoc', { permission })
  } catch (error) {
    state.errors = error
    toast.error(error.message, {
      position: 'bottom'
    })
  }
}

const _updateUser = async () => {
  const payload = {
    name: doc.value.name,
    phone: doc.value.phone
  }
  try {
    await store.dispatch('users/updateDoc', payload)
    toast.success('User updated', {
      position: 'bottom'
    })
  } catch (error) {
    state.errors = error
    toast.error(error.message, {
      position: 'bottom'
    })
    // console.log(state)
  }
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

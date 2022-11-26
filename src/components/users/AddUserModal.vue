<script setup>
import { ref, reactive } from 'vue'
import { createToaster } from '@meforma/vue-toaster'
import CBaseModal from '../CBaseModal.vue'
import VsudInput from '../VsudInput.vue'
import VsudButton from '../VsudButton.vue'
import CSwitch from '../CSwitch.vue'
import store from '@/store'

const state = reactive({
  name: '',
  email: '',
  phone: '',
  permission: 'standard',
  password: '',
  passwordConfirmation: ''
})

const toast = createToaster()

const visible = ref(false)

const handleModal = () => {
  visible.value = !visible.value
}

const setAdmin = (val) => {
  state.permission = val ? 'admin' : 'standard'
  console.log(state)
}

const _createUser = () => {
  if (state.password !== state.passwordConfirmation) {
    toast.error('Passwords must be equal', {
      position: 'bottom'
    })
  } else {
    addUser()
  }
}

const addUser = async () => {
  try {
    await store.dispatch('users/createDoc', state)

    toast.success('User has been added', {
      position: 'bottom'
    })
    handleModal()
  } catch (error) {
    toast.error(error.message, {
      position: 'bottom'
    })
  }
}
</script>

<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button" class="btn btn-primary" data-toggle="modal"
      data-target="#exampleModal"
      @click="handleModal"
    >
      +
    </button>

    <!-- Modal -->
    <CBaseModal
      v-if="visible"
      size="large"
      :shadow-close="true"
      @close="handleModal"
    >
      <div>
        <h4 class="text-center">
          Add new User
        </h4>
        <form role="form" class="text-start" @submit.prevent="_createUser">
          <div class="row">
            <div class="col">
              <label>Name</label>
              <VsudInput
                v-model:value="state.name"
                icon="fa fa-user"
                icon-dir="left"
                type="text"
                placeholder="Name"
                name="name"
              />
            </div>

            <div class="col">
              <label>Email</label>
              <VsudInput
                v-model:value="state.email"
                icon="fa fa-email"
                icon-dir="left"
                type="email"
                placeholder="Name"
                name="name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Phone</label>
              <VsudInput
                v-model:value="state.phone"
                icon="fa fa-phone"
                icon-dir="left"
                type="text"
                placeholder="Name"
                name="name"
              />
            </div>
            <div class="col">
              <label>Permission</label>
              <CSwitch :value="state.permission === 'admin'" @click="(e) => setAdmin(e.target.checked)">
                {{ state.permission === 'admin' ? 'Administrator' : 'Standard' }}
              </CSwitch>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Password</label>
              <VsudInput
                v-model:value="state.password"
                icon="fa fa-key"
                icon-dir="left"
                type="password"
                placeholder="Name"
                name="name"
              />
            </div>
            <div class="col">
              <label>Password confirmation</label>
              <VsudInput
                v-model:value="state.passwordConfirmation"
                icon="fa fa-key"
                icon-dir="left"
                type="password"
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
    </CBaseModal>
  </div>
</template>

<style lang='scss' scoped></style>

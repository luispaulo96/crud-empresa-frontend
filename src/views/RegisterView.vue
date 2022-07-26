<template>
  <Head>
    <title>Registrar – CRUD Empresa</title>
  </Head>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-weight-light my-4">Registrar nova conta</h3>
          </div>
          <div class="card-body">
            <form method="POST" @submit.prevent="handleSubmit">
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="mb-3 mb-md-0">
                    <label for="tf-email">Email</label>
                    <input class="form-control" v-model.trim="newEmail" type="email" placeholder="email@example.com"
                      required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3 mb-md-0">
                    <label for="tf-password">Senha</label>
                    <div class="input-group mb-3">
                      <input class="form-control" v-model.trim="newPassword" type="password"
                        placeholder="Crie sua senha" required />
                      <button class="btn btn-outline-secondary" type="button" @click="handleToggle">
                        <span v-if="toggle">
                          <b-icon-eye />
                        </span>
                        <span v-else>
                          <b-icon-eye-slash />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="d-grid gap-2 mb-0">
                  <button class="btn btn-primary" type="submit" :disabled="isSending">
                    <span class="spinner-border spinner-border-sm" v-show="isSending"></span>
                    Registrar
                  </button>
                </div>
              </div>
              <div class="alert alert-success text-center" role="alert" v-show="isSubmitted && !hasError">
                {{ message }}
              </div>
              <div class="alert alert-danger text-center" role="alert" v-show="isSubmitted && hasError">
                {{ message }}
              </div>
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <div class="small">
              <router-link to="/login">Voltar para o login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Head } from '@vueuse/head'
import { BIconEye, BIconEyeSlash } from 'bootstrap-icons-vue'
</script>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      toggle: false,
      newEmail: '',
      newPassword: '',
      isSending: false,
      isSubmitted: false,
      hasError: false,
      message: '',
    }
  },
  methods: {
    handleToggle(event) {
      const input = event.target.previousElementSibling

      if (input.type === 'password') {
        input.type = 'text'
        this.toggle = true
        return
      }

      input.type = 'password'
      this.toggle = false
    },
    async handleSubmit() {
      this.isSending = true
      this.isSubmitted = false
      this.hasError = false

      try {
        const response = await fetch(`//localhost:8081/auth/signup`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: this.newEmail,
            password: this.newPassword,
          }),
        })
        const data = await response.json()

        if (!response.ok) {
          throw data.message
        }

        this.message = data.message

        this.newEmail = ''
        this.newPassword = ''

        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      } catch (err) {
        this.hasError = true
        this.message = err
      } finally {
        this.isSending = false
        this.isSubmitted = true
      }
    },
  },
}
</script>

<template>
  <Head>
    <title>Login – CRUD Empresa</title>
  </Head>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-weight-light my-4">Login da empresa</h3>
          </div>
          <div class="card-body">
            <form method="POST" @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="w-100">
                  <span>Email</span>
                  <input class="form-control" v-model.trim="loginEmail" type="email" placeholder="Digite seu email"
                    required />
                </label>
              </div>
              <div class="mb-3">
                <label class="w-100">
                  <span>Senha</span>
                  <div class="input-group mb-3">
                    <input class="form-control" v-model.trim="loginPassword" type="password"
                      placeholder="Digite sua senha" required />
                    <button class="btn btn-outline-secondary" type="button" @click="handleToggle">
                      <span v-if="toggle">
                        <b-icon-eye />
                      </span>
                      <span v-else>
                        <b-icon-eye-slash />
                      </span>
                    </button>
                  </div>
                </label>
              </div>
              <div class="d-grid gap-2 mt-4 mb-0">
                <button class="btn btn-primary" type="submit" :disabled="isSending">
                  <span class="spinner-border spinner-border-sm" v-show="isSending"></span>
                  Entrar
                </button>
              </div>
              <div class="mt-4">
                <div class="alert alert-success text-center" role="alert" v-show="isSubmitted && !hasError">
                  {{ message }}
                </div>
                <div class="alert alert-danger text-center" role="alert" v-show="isSubmitted && hasError">
                  {{ message }}
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <div class="small">
              <router-link to="/register">Registrar nova conta</router-link>
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
  name: 'LoginView',
  data() {
    return {
      toggle: false,
      loginEmail: '',
      loginPassword: '',
      isSending: false,
      isSubmitted: false,
      hasError: false,
      message: '',
    }
  },
  methods: {
    handleToggle(event) {
      const togglePassword = event.target.previousElementSibling

      if (togglePassword.type === 'password') {
        togglePassword.type = 'text'
        this.toggle = true
        return
      }

      togglePassword.type = 'password'
      this.toggle = false
    },
    async handleSubmit() {
      this.isSending = true
      this.isSubmitted = false
      this.hasError = false

      try {
        const response = await fetch(`//localhost:8081/auth/login`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: this.loginEmail,
            password: this.loginPassword,
          }),
        })
        const data = await response.json()

        if (!response.ok) {
          throw data.message
        }

        localStorage.setItem('token', data.token)

        this.message = data.message

        this.loginEmail = ''
        this.loginPassword = ''

        setTimeout(() => {
          this.$router.push('/')
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

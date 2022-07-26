<template>
  <Head>
    <title>Lista de usuários – CRUD Empresa</title>
  </Head>
  <menu-bar />
  <div class="container-fluid px-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <h1 class="text-center">Usuários cadastrados</h1>
        <div class="row mb-3">
          <div class="col-md-6 offset-md-3">
            <label class="w-100 text-center">
              <span>Departamento</span>
              <select class="form-select" @change="handleChange">
                <option :value="depart.pk_departments" v-for="depart in departments" :key="depart.pk_departments">
                  {{ depart.vc_name }}
                </option>
              </select>
            </label>
          </div>
        </div>
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
              </tr>
            </thead>
            <tbody v-if="items.length">
              <tr class="position-relative" v-for="item in items" :key="item.pk_users">
                <td>
                  <router-link class="stretched-link text-reset text-decoration-none"
                    :to="{ name: 'users.edit', params: { id: item.pk_users } }">
                    {{ item.vc_name }}
                  </router-link>
                </td>
                <td>{{ item.role_name }}</td>
              </tr>
            </tbody>
            <tbody>
              <tr class="text-center" v-show="!items.length">
                <td colspan="3">Nenhum usuário cadastrado</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center">
          <router-link class="btn btn-success" to="/users/create">Cadastrar novo usuário</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Head } from '@vueuse/head'
import MenuBar from '@/components/MenuBar.vue'
</script>

<script>
export default {
  name: 'UsersShow',
  data() {
    return {
      items: [],
      departments: [],
    }
  },
  async mounted() {
    try {
      const departResponse = await fetch('//localhost:8081/departments', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      this.departments = await departResponse.json()

      // Simulate change event trigger
      this.handleChange({
        target: {
          value: this.departments[0].pk_departments,
        },
      });
    } catch (ex) {
      this.departments = []
    }
  },
  methods: {
    async handleChange(event) {
      const departId = event.target.value;

      try {
        const itemResponse = await fetch(`//localhost:8081/users/departments/${departId}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.items = await itemResponse.json()
      } catch (ex) {
        this.items = []
      }
    },
  },
}
</script>

<template>
  <Head>
    <title>Lista de cargos – CRUD Empresa</title>
  </Head>
  <menu-bar />
  <div class="container-fluid px-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <h1 class="text-center">Cargos cadastrados</h1>
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Salário (R$)</th>
              </tr>
            </thead>
            <tbody v-if="items.length">
              <tr class="position-relative" v-for="item in items" :key="item.pk_roles">
                <td>
                  <router-link class="stretched-link text-reset text-decoration-none"
                    :to="{ name: 'roles.edit', params: { id: item.pk_roles } }">
                    {{ item.vc_name }}
                  </router-link>
                </td>
                <td>{{ item.vc_description }}</td>
                <td>{{ item.nu_salary.replace('.', ',') }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="3">Nenhum cargo cadastrado</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center">
          <router-link class="btn btn-success" to="/roles/create">Cadastrar novo cargo</router-link>
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
  name: 'RolesShow',
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    try {
      const response = await fetch('//localhost:8081/roles', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      this.items = await response.json()
    } catch (ex) {
      this.items = []
    }
  },
}
</script>

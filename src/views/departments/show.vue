<template>
  <Head>
    <title>Lista de departamentos – CRUD Empresa</title>
  </Head>
  <menu-bar />
  <div class="container-fluid px-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <h1 class="text-center">Departamentos cadastrados</h1>
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Total de custos (R$)</th>
              </tr>
            </thead>
            <tbody v-if="items.length">
              <tr class="position-relative" v-for="item in items" :key="item.pk_departments">
                <td>
                  <router-link class="stretched-link text-reset text-decoration-none"
                    :to="{ name: 'departments.edit', params: { id: item.pk_departments } }">
                    {{ item.vc_name }}
                  </router-link>
                </td>
                <td>{{ item.vc_description }}</td>
                <td>{{ item.total_cost.replace('.', ',') }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="3">Nenhum departamento cadastrado</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center">
          <router-link class="btn btn-success" to="/departments/create">Cadastrar novo departamento</router-link>
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
  name: 'DepartmentsShow',
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    try {
      const response = await fetch('//localhost:8081/departments', {
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

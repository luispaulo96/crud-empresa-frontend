<template>
  <Head>
    <title>Editar departamento – CRUD Empresa</title>
  </Head>
  <menu-bar />
  <div class="container-fluid px-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <h1 class="text-center">Editar departamento existente</h1>
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <depart-form button-text="Editar" :id="id" />
            <div class="text-center py-3">
              <div class="small">
                <router-link to="/departments">Voltar para a lista</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Head } from '@vueuse/head'
import MenuBar from '@/components/MenuBar.vue'
import DepartForm from '@/components/DepartForm.vue'
</script>

<script>
export default {
  name: 'DepartamentsEdit',
  props: [
    'id',
  ],
}
</script>

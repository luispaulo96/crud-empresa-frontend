<template>
  <Head>
    <title>Cadastrar cargo – CRUD Empresa</title>
  </Head>
  <menu-bar />
  <div class="container-fluid px-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <h1 class="text-center">Cadastrar novo cargo</h1>
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <role-form button-text="Cadastrar" />
            <div class="text-center py-3">
              <div class="small">
                <router-link to="/roles">Voltar para a lista</router-link>
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
import RoleForm from '@/components/RoleForm.vue'
</script>

<script>
export default {
  name: 'RolesCreate',
}
</script>

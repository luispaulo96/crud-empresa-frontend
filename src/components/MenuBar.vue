<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="#">Empresa</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-company"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-company">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/users">
            Usuários
          </router-link>
        </div>
        <div class="navbar-nav">
          <router-link class="nav-link" to="/roles">
            Cargos
          </router-link>
        </div>
        <div class="navbar-nav">
          <router-link class="nav-link" to="/departments">
            Departamentos
          </router-link>
        </div>
        <div class="navbar-nav">
          <router-link class="nav-link" to="/cost-center">
            Centro de custos
          </router-link>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" to="/logout">
            Sair
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MenuBar',
}
</script>

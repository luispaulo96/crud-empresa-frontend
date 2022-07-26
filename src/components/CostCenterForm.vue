<template>
  <form method="POST" @submit.prevent="handleSubmit">
    <div class="row mb-3">
      <div class="col-md-4">
        <div class="mb-3 mb-md-0">
          <label class="w-100">
            <span>Nome</span>
            <input class="form-control" v-model.trim="costName" type="text" placeholder="Digite o nome" required />
          </label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-3 mb-md-0">
          <label class="w-100">
            <span>Preço (R$)</span>
            <input class="form-control" v-model.trim="costPrice" type="text" placeholder="Digite o preço" required />
          </label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-3 mb-md-0">
          <label class="w-100">
            <span>Departamento</span>
            <select class="form-select" v-model="costDepartment" required>
              <option disabled value="">Selecione um departamento</option>
              <option :value="depart.pk_departments" v-for="depart in departments" :key="depart.pk_departments">
                {{ depart.vc_name }}
              </option>
            </select>
          </label>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="d-grid gap-2 mb-0">
        <button class="btn btn-primary" type="submit" :disabled="isSending">
          <span class="spinner-border spinner-border-sm" v-show="isSending"></span>
          {{ buttonText }}
        </button>
        <a class="btn text-danger" data-bs-toggle="modal" data-bs-target="#modal-delete" v-show="id">
          Excluir centro de custo
        </a>
      </div>
    </div>
    <div class="alert alert-success text-center" role="alert" v-show="isSubmitted && !hasError">{{ message }}</div>
    <div class="alert alert-danger text-center" role="alert" v-show="isSubmitted && hasError">{{ message }}</div>
    <div class="modal fade" id="modal-delete" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmação de exclusão</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Tem certeza que deseja excluir o centro de custo?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="handleDeletion">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CostCenterForm',
  data() {
    return {
      departments: [],
      costName: '',
      costPrice: '',
      costDepartment: '',
      isSending: false,
      isSubmitted: false,
      hasError: false,
      message: '',
    }
  },
  methods: {
    async handleSubmit() {
      this.isSending = true
      this.isSubmitted = false
      this.hasError = false

      try {
        const response = await fetch(`//localhost:8081/cost-center/${this.id || ''}`, {
          method: this.id ? 'PUT' : 'POST',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: this.costName,
            price: this.costPrice.replace(',', '.'),
            departmentId: this.costDepartment,
          }),
        })
        const data = await response.json()

        if (!response.ok) {
          throw data.message
        }

        this.message = data.message

        // Clear the form only on item creation
        if (!this.id) {
          this.costName = ''
          this.costPrice = ''
          this.costDepartment = ''
        }
      } catch (err) {
        this.hasError = true
        this.message = err
      } finally {
        this.isSending = false
        this.isSubmitted = true
      }
    },
    async handleDeletion() {
      this.isSending = true
      this.isSubmitted = false
      this.hasError = false

      try {
        const response = await fetch(`//localhost:8081/cost-center/${this.id}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await response.json()

        if (!response.ok) {
          throw data.message
        }

        this.costName = ''
        this.costPrice = ''
        this.costDepartment = ''

        this.message = data.message

        setTimeout(() => {
          this.$router.push('/cost-center')
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
  async mounted() {
    try {
      const departResponse = await fetch('//localhost:8081/departments', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      this.departments = await departResponse.json()
    } catch (ex) {
      this.departments = []
    }

    // Only make the request when editing the item
    if (!this.id) {
      return
    }

    try {
      const response = await fetch(`//localhost:8081/cost-center/${this.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()

      this.costName = data.vc_name
      this.costPrice = data.nu_price.replace('.', ',')
      this.costDepartment = data.fk_departments
    } catch (ex) {
      this.costName = ''
      this.costPrice = ''
      this.costDepartment = ''
    }
  },
  props: [
    'id',
    'buttonText',
  ],
}
</script>

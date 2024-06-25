<template>
  <v-container class="bg-black mt-16 h-100">
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="my-5">Seção do Administrador</h1>
      </v-col>
    </v-row>

    <!-- Contatos Enviados -->
    <v-row class="text-center">
      <v-col cols="12">
        <h2 class="my-3">Contatos Enviados</h2>
      </v-col>
    </v-row>

    <v-table theme="dark" class="overflow-x-auto">
      <thead>
        <tr>
          <th class="text-h5">ID</th>
          <th class="text-h5">Nome</th>
          <th class="text-h5">Email</th>
          <th class="text-h5">Mensagem</th>
          <th class="text-h5">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr class="text-center" v-for="contato in contatos" :key="contato._id">
          <td>{{ contato._id }}</td>
          <td>{{ contato.name }}</td>
          <td>{{ contato.email }}</td>
          <td class="word-wrap-break">{{ contato.message }}</td>
          <td>
            <v-btn @click="deleteContato(contato._id)" class="text-decoration-none bg-red-darken-4">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-row class="d-flex justify-center mt-5">
      <v-progress-circular v-if="isFetching" color="primary" indeterminate :size="74" :width="8"></v-progress-circular>
    </v-row>

    <!-- Usuários Registrados -->
    <v-row class="text-center mt-10">
      <v-col cols="12">
        <h2 class="my-3">Usuários Registrados</h2>
      </v-col>
    </v-row>

    <v-table theme="dark" class="overflow-x-auto">
      <thead>
        <tr>
          <th class="text-h5">ID</th>
          <th class="text-h5">Nome de Usuário</th>
          <th class="text-h5">Email</th>
          <th class="text-h5">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr class="text-center" v-for="usuario in usuarios" :key="usuario._id">
          <td>{{ usuario._id }}</td>
          <td>{{ usuario.userName }}</td>
          <td>{{ usuario.email }}</td>
          <td>
            <v-btn @click="deleteUser(usuario._id)" class="text-decoration-none bg-red-darken-4">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-row class="d-flex justify-center mt-5">
      <v-progress-circular v-if="isFetchingUsers" color="primary" indeterminate :size="74" :width="8"></v-progress-circular>
    </v-row>

    <FooterComponent />
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const contatos = useState('contatos', () => []);
const usuarios = useState('usuarios', () => []);
const isFetching = useState('isFetching', () => false);
const isFetchingUsers = useState('isFetchingUsers', () => false);
const isLogged = useState('isLogged', () => true);

const getContatos = async () => {
  try {
    isFetching.value = true;
    const response = await axios.get('https://lista-de-tarefas-back-end-plum.vercel.app/contatos');
    contatos.value = response.data;
    isFetching.value = false;
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    isFetching.value = false;
  }
};

const getUsuarios = async () => {
  try {
    isFetchingUsers.value = true;
    const response = await axios.get('https://lista-de-tarefas-back-end-plum.vercel.app/users');
    usuarios.value = response.data;
    isFetchingUsers.value = false;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    isFetchingUsers.value = false;
  }
};

const deleteContato = async (contatoId) => {
  try {
    await axios.delete(`https://lista-de-tarefas-back-end-plum.vercel.app/contatos/${contatoId}`);
    getContatos(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`https://lista-de-tarefas-back-end-plum.vercel.app/users/${userId}`);
    getUsuarios(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
  }
};

// Chama getContatos e getUsuarios ao montar o componente
onMounted(() => {
  getContatos();
  getUsuarios();
});

definePageMeta({
  middleware: 'auth',
});
</script>


<style scoped>
.display-1 {
    font-size: 3rem;
}

.text-center {
    color: #fff;
}

.bg-black {
    background-color: #000;
}

.overflow-x-auto {
    overflow-x: auto;
}

.word-wrap-break {
    word-wrap: break-word;
}
</style>

<template>
  <v-container class="bg-black mt-16 h-100">
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="my-5">Seção do Administrador</h1>
      </v-col>
    </v-row>

    <v-table theme="dark" class="overflow-x-auto">
      <thead>
        <tr>
          <th class="text-h5">
            ID
          </th>
          <th class="text-h5">
            Nome
          </th>
          <th class="text-h5">
            Email
          </th>
          <th class="text-h5">
            Mensagem
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="text-center" v-for="contato in contatos" :key="contato._id">
          <td>
            {{ contato._id }}
          </td>
          <td>
            {{ contato.name }}
          </td>
          <td>
            {{ contato.email }}
          </td>
          <td class="word-wrap-break">
            {{ contato.message }}
          </td>
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

    <FooterComponent />
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';


const router = useRouter();
const contatos = useState('contatos', () => []);
const isFetching = useState('isFetching', () => false);
const isLogged = useState('isLogged', () => true);

const getContatos = async () => {
  try {
    isFetching.value = true;
    const response = await axios.get('https://rafael-portfolio-back-end.vercel.app/contatos');
    contatos.value = response.data;
    isFetching.value = false;
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    isFetching.value = false;
  }
};

const deleteContato = async (contatoId) => {
  try {
    await axios.delete(`https://rafael-portfolio-back-end.vercel.app/contatos/${contatoId}`);
    getContatos(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
  }
};

const loadingFlag = useState('loadingFlag', () => false);

// Chama getContatos ao montar o componente
onMounted(() => {
  getContatos();
});


definePageMeta({
  middleware: 'auth',
});
</script>

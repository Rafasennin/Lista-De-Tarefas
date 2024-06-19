<template>
  <v-container class="bg-black mt-16">
    <form @submit.prevent="addTask">
      <v-text-field v-model="taskAuthor" label="Autor"></v-text-field>
      <v-text-field v-model="taskName" label="Título da tarefa"></v-text-field>
      <v-text-field v-model="taskDate" label="Data de criação" readonly></v-text-field>
      <v-textarea v-model="taskContent" label="Conteúdo da Tarefa"></v-textarea>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" type="submit">Adicionar</v-btn>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-progress-linear v-if="isAdding" indeterminate color="primary"></v-progress-linear>
          </v-row>
        </v-col>
      </v-row>
    </form>

    <v-table theme="dark" class="overflow-x-auto">
      <thead>
        <tr>
          <th class="text-h5">Autor</th>
          <th class="text-h5">Tarefa</th>
          <th class="text-h5">Data</th>
          <th class="text-h5">Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="task in tasks" :key="task._id">
          <td>{{ task.author }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.date }}</td>
          <td class="word-wrap-break">{{ task.text }}</td>
          <td>
            <v-btn v-if="loginStatus" @click="deleteTask(task._id)" class="text-decoration-none bg-red-darken-4">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <tr class="d-flex justify-center">
      {{ currentDate }}
      <v-progress-circular v-if="loadingFlag" color="primary" indeterminate :size="74" :width="8"></v-progress-circular>
    </tr>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const isLogged = useState('isLogged', () => false);

const loginStatus = isLogged.value;

const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const taskAuthor = useState('taskAuthor', () => '');
const taskName = useState('taskName', () => '');
const taskDate = useState('taskDate', () => getCurrentDate()); // Chamando getCurrentDate aqui
const taskContent = useState('taskContent', () => '');
const tasks = useState('tasks', () => []);
const isAdding = useState('isAdding', () => false);
const isFetching = useState('isFetching', () => false);


const getTasks = async () => {
  try {
    isFetching.value = true;
    const response = await axios.get("https://lista-de-tarefas-back-end-lake.vercel.app/tasks");
    tasks.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  } finally {
    isFetching.value = false;
  }
};

const addTask = async () => {
  if (taskName.value && taskAuthor.value && taskContent.value) {
    isAdding.value = true;
    try {
      const task = {
        author: taskAuthor.value,
        title: taskName.value,
        date: getCurrentDate(),
        text: taskContent.value
      };
      await axios.post("https://lista-de-tarefas-back-end-lake.vercel.app/tasks", task);
      getTasks();
      // Limpar campos do formulário
      taskAuthor.value = '';
      taskName.value = '';
      taskContent.value = '';
    } catch (error) {
      console.error("Erro ao enviar tarefa:", error);
    } finally {
      isAdding.value = false;
    }
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
};

const deleteTask = async (taskId: string) => {
  try {
    await axios.delete(`https://lista-de-tarefas-back-end-lake.vercel.app/tasks/${taskId}`);
    // Atualiza a lista de tasks após a exclusão
    getTasks();
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
  }
};

// Chamar getTasks ao montar o componente
getTasks();
</script>

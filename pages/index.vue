<template>
    <v-container class="bg-black">
        <!-- Banner Explicativo -->
        <v-row class="d-flex justify-center mt-16">
            <v-col cols="12" class="text-center">
                <h1>Lista de Tarefas</h1>
                <p>Bem-vindo à aplicação de gerenciamento de tarefas !</p>
                <p>
                    Para começar,
                    <router-link to="/login" class="text-white">faça login</router-link>
                    se já estiver cadastrado ou
                    <router-link to="/register" class="text-white">cadastre-se</router-link>
                    para acessar sua lista de tarefas.
                </p>
            </v-col>
        </v-row>

        <!-- Validação de Login -->
        <v-row v-if="isLoggedStatus" class="d-flex justify-center mt-4">
            <v-col cols="12" class="text-center">
                <h2>Logado como {{ getUserName }}</h2>
                <LoginComponent />
            </v-col>
        </v-row>
        <v-row v-if="isLoggedStatus" class="d-flex justify-center mt-4">
            <v-col cols="12" class="text-center">
                <Card />
            </v-col>
        </v-row>

        <!-- Mensagem para Usuário Não Logado -->
        <v-row v-else class="d-flex justify-center mt-4">
            <v-col cols="12" class="text-center">
                <LoginComponent />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '~/store/index'; // Substitua pelo seu store Vuex ou Pinia

const router = useRouter();
let userName = ''; 

// Verifica se o usuário está logado
const getUserName = computed(() => {
    console.log(store.state.isUserName)
   return store.state.isUserName;
});

// Verifica se o usuário está logado
const isLoggedStatus = computed(() => {
  return store.state.isLogged;
});

</script>

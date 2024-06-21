<template>
  <v-container class="bg-black d-flex justify-center h-screen">
    <v-sheet class="mx-auto mt-16 bg-grey-darken-4 pa-12" width="400" height="430" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form ref="form">
          <v-text-field prepend-inner-icon="mdi-account" v-model="email" label="Usuario" :rules="emailRules"
            variant="outlined" placeholder="Digite o usuario" required></v-text-field>
          <v-text-field prepend-inner-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="togglePasswordVisibility" :type="showPassword ? 'text' : 'password'" v-model="password"
            label="Senha" :rules="passwordRules" variant="outlined" placeholder="Digite sua senha"
            required></v-text-field>
          <div class="d-flex flex-column">
            <v-btn color="success" block @click="login" size="large" type="button" variant="elevated">
              Entrar
            </v-btn>
            <v-btn :to="homeLink" class="mt-4 mb-2" color="primary" type="button" size="large" variant="elevated">
              Voltar
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '~/store/index';

const SecretPsw = "Senha123";

const router = useRouter();

const email = ref('rafasennin@hotmail.com');
const password = ref('Sennin007');
const showPassword = ref(false);
const homeLink = '/';

const emailRules = [
  (value: string) => !!value || 'E-mail é obrigatório.',
  (value: string) => /.+@.+\..+/.test(value) || 'O E-mail deve ser válido.',
];

const passwordRules = [
  (value: string) => !!value || 'A senha é necessária.',
  (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value) ||
    'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.',
];

const validateInput = () => {
  const emailValid = emailRules.every((rule) => rule(email.value) === true);
  const passwordValid = passwordRules.every((rule) => rule(password.value) === true);
  if (!emailValid) {
    alert('E-mail inválido. Por favor, verifique o e-mail inserido.');
    return false;
  }

  if (!passwordValid) {
    alert('Senha inválida. Por favor, verifique a senha inserida.');
    return false;
  }

  return true;
};

const login = async () => {
  if (!validateInput()) {
    return;
  }

  try {
    const response = await axios.get("https://lista-de-tarefas-back-end-plum.vercel.app/users");
    const users = response.data;
    const user = users.find(user => user.email === email.value);

    if (!user) {
      alert('Usuário não cadastrado, contate o administrador.');
      return;
    }
    if (user.password !== password.value) {
      alert('Senha inválida. Por favor, contate o administrador.');
      return;
    }

    // Armazenar o nome do usuário no Vuex 
    store.commit('SET_USER_NAME', user.userName);
    store.commit('SET_LOGGED', true);
    router.push('/');
  } catch (error) {
    console.error('Erro ao validar usuário:', error);
    alert('Ocorreu um erro ao validar o usuário. Por favor, tente novamente mais tarde.');
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
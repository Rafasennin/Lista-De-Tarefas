<template>
    <v-container class="bg-black mt-16">
        <v-row class="mt-2">
            <v-col cols="12" class="text-center">
                <h1>Registrar usuário</h1>
            </v-col>
        </v-row>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-form class="mb-10" ref="form">
                        <v-row>
                            <v-col cols="12" lg="12" md="6" >
                                <v-text-field label="Nome" v-model="userName" :rules="nameRules"
                                    prepend-inner-icon="mdi-account" variant="outlined"
                                    placeholder="Digite seu nome de usuario">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field prepend-inner-icon="mdi-email" v-model="email" label="Email"
                                    :rules="emailRules" variant="outlined" placeholder="Digite seu email"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field prepend-inner-icon="mdi-email" v-model="confirmEmail"
                                    label="Confirme seu email" :rules="confirmEmailRules" variant="outlined"
                                    placeholder="Confirme seu email" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field prepend-inner-icon="mdi-lock"
                                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="togglePasswordVisibility"
                                    :type="showPassword ? 'text' : 'password'" v-model="password" label="Senha"
                                    :rules="passwordRules" variant="outlined" placeholder="Digite sua senha"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field prepend-inner-icon="mdi-lock"
                                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="togglePasswordVisibility"
                                    :type="showPassword ? 'text' : 'password'" v-model="confirmPassword"
                                    label="Confirme sua senha" :rules="confirmPasswordRules" variant="outlined"
                                    placeholder="Confirme sua senha" required></v-text-field>
                            </v-col>

                            <v-col cols="12" class="d-flex justify-center">
                                <v-btn color="success" @click="validate" size="large" type="submit" variant="elevated">
                                    Registrar
                                </v-btn>
                            </v-col>
                            <v-col class=" d-flex justify-center mt-4 mb-2">
                                <v-btn :to="homeLink" color="primary" size="large" variant="elevated">
                                    Voltar
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-progress-linear v-if="isLoading" indeterminate color="primary"></v-progress-linear>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const userName = useState('userName', () => '');
const email = useState('email', () => '');
const confirmEmail = useState('confirmEmail', () => '');
const password = useState('password', () => '');
const confirmPassword = useState('confirmPassword', () => '');
const showPassword = ref(false);
const isLogged = useState('isLogged', () => false);
const homeLink = '/';

const nameRules = [
    (value: string) => !!value || 'Digite seu nome.',
    (value: string) => (value && value.length >= 3) || 'Digite um nome válido.'
];

const emailRules = [
    (value: string) => !!value || 'E-mail é obrigatório.',
    (value: string) => /.+@.+\..+/.test(value) || 'O E-mail deve ser válido.',
];

const confirmEmailRules = [
    (value: string) => !!value || 'Confirmação de e-mail é obrigatória.',
    (value: string) => value === email.value || 'Os e-mails não coincidem.',
];

const passwordRules = [
    (value: string) => !!value || 'A senha é necessária.',
    (value: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value) ||
        'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.',
];

const confirmPasswordRules = [
    (value: string) => !!value || 'Confirmação de senha é obrigatória.',
    (value: string) => value === password.value || 'As senhas não coincidem.',
];


const registerUser = async () => {
    const userData = {
        userName: userName.value,
        email: email.value,
        password: password.value
    };

    try {
        const response = await axios.post('https://lista-de-tarefas-back-end-lake.vercel.app/tasks', userData);

        if (response.status === 201) {
            console.log('Usuário registrado com sucesso:', response.data);
            alert('Usuário registrado com sucesso!');
            router.push('/login'); // Redireciona para a página de login após o registro bem-sucedido
        } else {
            console.error('Erro ao registrar usuário:', response.data.message);
            alert(`Erro ao registrar usuário: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Erro na solicitação de registro:', error);
        alert('Erro ao registrar usuário. Por favor, tente novamente mais tarde.');
    }
};

const validate = () => {
    const nameValid = nameRules.every((rule) => rule(userName.value) === true);
    const emailValid = emailRules.every((rule) => rule(email.value) === true);
    const confirmEmailValid = confirmEmailRules.every((rule) => rule(confirmEmail.value) === true);
    const passwordValid = passwordRules.every((rule) => rule(password.value) === true);
    const confirmPasswordValid = confirmPasswordRules.every((rule) => rule(confirmPassword.value) === true);

    if (nameValid && emailValid && confirmEmailValid && passwordValid && confirmPasswordValid) {
        if (email.value === confirmEmail.value && password.value === confirmPassword.value) {
            registerUser(); // Chama a função para registrar o novo usuário
        } else {
            alert('Emails ou senhas não coincidem.');
        }
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
</script>

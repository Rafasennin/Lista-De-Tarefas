<template>
    <v-container class="bg-black d-flex justify-center h-screen">
        <v-sheet class="mx-auto mt-16 bg-grey-darken-4 pa-12" width="400" height="430" rounded>
            <v-card class="mx-auto px-6 py-8" max-width="344">
                <v-form ref="form">
                    <v-text-field prepend-inner-icon="mdi-account" v-model="email" label="Usuario" :rules="emailRules"
                        variant="outlined" placeholder="Digite o usuario" required></v-text-field>
                    <v-text-field prepend-inner-icon="mdi-lock"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="togglePasswordVisibility" :type="showPassword ? 'text' : 'password'"
                        v-model="password" label="Senha" :rules="passwordRules" variant="outlined"
                        placeholder="Digite sua senha" required></v-text-field>
                    <div class="d-flex flex-column">
                        <v-btn color="success" block @click="validate" size="large" type="submit" variant="elevated">
                            Logar
                        </v-btn>
                        <v-btn :to="homeLink" class="mt-4 mb-2" color="primary" type="submit" size="large"
                            variant="elevated">
                            Voltar
                        </v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const SecretPsw = "Senha123";

const router = useRouter();

const email = useState('email', () => 'rafasennin@hotmail.com');
const password = useState('password', () => 'Senha123');
const showPassword = ref(false);
const isLogged = useState('isLogged', () => false);
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

const validate = () => {
    const emailValid = emailRules.every((rule) => rule(email.value) === true);
    if (emailValid) {
        if (email.value === 'rafasennin@hotmail.com') {
            const passwordValid = passwordRules.every((rule) => rule(password.value) === true);
            if (passwordValid && SecretPsw === password.value) {
                isLogged.value = true;
                console.log('Login bem-sucedido:', isLogged.value);
                router.push('/');
            } else {
                alert('Senha inválida. Por favor, contate o administrador.');
            }
        } else {
            alert('Usuário não cadastrado, contate o administrador.');
        }
    } else {
        alert('E-mail inválido. Por favor, verifique o e-mail inserido.');
    }
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

</script>
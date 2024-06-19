export default defineNuxtRouteMiddleware((to, from) => {
  const isLogged = useState('isLogged', () => false);

  // Se o usuário tentar acessar a página de administração e não estiver autenticado, redirecione para a tela de login
  if (to.path === '/AdminView' && !isLogged.value) {
    console.log("Usuário não autenticado, redirecionando para a tela de login");
    return navigateTo('/');
  }

  // Caso contrário, permita o acesso à rota desejada
});

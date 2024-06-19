<template>
    <v-container class="main__article">
        <v-parallax height="400" src="../assets/matrix_1.jpg">
            <div class="d-flex justify-center">
                <v-avatar class="ma-10 opacity-80" size="300">
                    <img src="../assets/profile.jpg" width="300">
                </v-avatar>
            </div>
        </v-parallax>

        <h2 class="article__title mt-10">Sobre mim,</h2><br>

        <p class="article__p">
            Sou desenvolvedor full-stack com experiência em projetos freelancers. Meu foco se
            concentra em tecnologias como Node.js, MongoDB, Vue e Vuetify. Tenho dedicado meu tempo ao aprimoramento
            contínuo nessas áreas, buscando sempre novos desafios e oportunidades para desenvolver-me.<br>
        </p>

        <p class="article__p">
            Após mais de 15 anos atuando na área da saúde como farmacêutico e técnico em radiologia médica, há mais
            de 2
            anos venho realizando a transição de carreira para a área de tecnologia, com foco no desenvolvimento de
            software. Atualmente, estou concluindo a faculdade de Análise e Desenvolvimento de Sistemas com ênfase
            total
            em desenvolvimento full-stack.<br>
        </p>

        <p class="article__p">
            Minha abordagem de trabalho é caracterizada pela dedicação, foco e abertura para explorar novas
            possibilidades no mundo da tecnologia. Estou em busca de oportunidades para me desenvolver e estou
            aberto a
            propostas que me permitam aprender e contribuir para projetos inovadores.<br>
        </p>
        <v-divider :thickness="1" class="border-opacity-50 mb-5 mt-5" color="white"></v-divider>
    </v-container>
</template>


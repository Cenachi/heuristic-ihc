import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';

export type Site = {
  name: string;
  problems: Problem[];
};

export type Problem = {
  id: number;
  description: string;
  answer: string;
};

const heuristics = [
  "Visibilidade do status do sistema",
  "Compatibilidade entre o sistema e o mundo real",
  "Controle e liberdade do usuário",
  "Consistência e padrões",
  "Prevenção de erros",
  "Reconhecimento em vez de memorização",
  "Flexibilidade e eficiência de uso",
  "Estética e design minimalista",
  "Ajuda para reconhecer, diagnosticar e recuperar de erros",
  "Ajuda e documentação",
];

export const useGameStore = defineStore('points', () => {
  const points = ref(0)

  const randomSiteName = ref<Site | null>();
  const randomProblem = ref<Problem | null>(null);
  const selectedProblems = new Set<Problem>(); // to avoid repeating problems
  const finalScore = ref(0);


  const sites = ref([
    {
      name: 'Yahoo',
      icon: '',
      problems: [
        {
          id: 1,
          description:
            'Design desatualizado. Um design ultrapassado dificulta o reconhecimento rápido de elementos familiares.',
          answer: 'Reconhecimento em vez de memorização',
        },
        {
          id: 2,
          description:
            'Navegação confusa. O design da navegação restringe a liberdade e dificulta o retorno às páginas desejadas.',
          answer: 'Controle e liberdade do usuário',
        },
        {
          id: 3,
          description:
            'Conteúdo desatualizado. Informações antigas quebram a expectativa de encontrar conteúdos relevantes e atuais.',
          answer: 'Compatibilidade entre o sistema e o mundo real',
        },
      ],
    },
    {
      name: 'Americanas',
      icon: '',
      problems: [
        {
          id: 4,
          description:
            'Tempo de carregamento lento. A ausência de feedback adequado durante o carregamento aumenta a frustração.',
          answer: 'Visibilidade do status do sistema',
        },
        {
          id: 5,
          description:
            'Busca ineficiente. O sistema não auxilia o usuário a encontrar informações ou corrigir erros de busca.',
          answer: 'Ajuda para reconhecimento, diagnóstico e recuperação de erros',
        },
        {
          id: 6,
          description:
            'Layout poluído. Excesso de elementos visuais compromete a clareza e dificulta a navegação.',
          answer: 'Estética e design minimalista',
        },
      ],
    },
    {
      name: 'Globo.com',
      icon: '',
      problems: [
        {
          id: 7,
          description:
            'Rodapé extenso e desorganizado. Elementos excessivos e desnecessários no rodapé interferem na simplicidade e clareza.',
          answer: 'Estética e design minimalista',
        },
        {
          id: 8,
          description:
            'Falta de categorização eficiente. Usuários precisam lembrar onde está a informação em vez de encontrá-la facilmente.',
          answer: 'Reconhecimento em vez de memorização',
        },
        {
          id: 9,
          description:
            'Largura inconsistente das colunas. A inconsistência quebra padrões visuais e prejudica a previsibilidade do sistema.',
          answer: 'Consistência e padrões',
        },
      ],
    },
    {
      name: 'UOL',
      icon: '',
      problems: [
        {
          id: 10,
          description:
            'Navegação confusa ao rolar a página. Usuários perdem a noção de onde estão no site durante a navegação.',
          answer: 'Visibilidade do status do sistema',
        },
        {
          id: 11,
          description:
            'Menu não fixo. A ausência de um menu fixo limita o retorno fácil às seções principais.',
          answer: 'Controle e liberdade do usuário',
        },
        {
          id: 12,
          description:
            'Ausência de botão para retornar ao topo. O sistema não fornece uma funcionalidade simples para ajudar o usuário na navegação.',
          answer: 'Ajuda e documentação',
        },
      ],
    },
    {
      name: 'Istoé',
      icon: '',
      problems: [
        {
          id: 13,
          description:
            'Excesso de publicidade. Anúncios excessivos poluem o layout e desviam a atenção do conteúdo principal.',
          answer: 'Estética e design minimalista',
        },
        {
          id: 14,
          description:
            'Anúncios sobrepostos. Anúncios sobrepostos podem levar a cliques acidentais e frustração.',
          answer: 'Prevenção de erros',
        },
        {
          id: 15,
          description:
            'Experiência negativa em dispositivos móveis. Interfaces não responsivas dificultam o uso eficiente por diferentes perfis de usuários.',
          answer: 'Flexibilidade e eficiência de uso',
        },
      ],
    },
    {
      name: 'Terra',
      icon: '',
      problems: [
        {
          id: 16,
          description:
            'Menu que desaparece ao rolar a página. A ausência de um menu fixo quebra o padrão esperado de navegação contínua.',
          answer: 'Consistência e padrões',
        },
        {
          id: 17,
          description:
            'Problemas ao abrir o menu suspenso. O comportamento inesperado do menu não corresponde às expectativas dos usuários.',
          answer: 'Compatibilidade entre o sistema e o mundo real',
        },
        {
          id: 18,
          description:
            'Sufoco publicitário. O excesso de anúncios interfere no conteúdo principal, prejudicando a experiência.',
          answer: 'Estética e design minimalista',
        },
      ],
    },
  ].slice(0, 2)); // Limit to one site for now

  function increment() {
    points.value++
  }

  function selectRandomProblem() {
    // Check if all problems have been used
    const totalProblems = sites.value.flatMap((site) => site.problems);
    if (selectedProblems.size === totalProblems.length) {
      selectedProblems.clear(); // Reset tracker
      finalScore.value = points.value;

      points.value = 0;
      router.push("/result");
      return;
    }

    // Randomly pick a site
    randomSiteName.value =
      sites.value[Math.floor(Math.random() * sites.value.length)];
    console.log(`Selected site: ${randomSiteName.value?.name}`);

    // Filter available problems across the chosen site
    const availableProblems = randomSiteName.value.problems.filter(
      (problem) => !selectedProblems.has(problem),
    );

    if (availableProblems.length === 0) {
      // Retry if this site has no available problems
      return selectRandomProblem();
    }

    // Randomly pick a problem from the available ones
    randomProblem.value =
      availableProblems[Math.floor(Math.random() * availableProblems.length)];

    console.log(`Selected problem: ${randomProblem.value?.description}`);
    console.log(`Selected problems count: ${selectedProblems.size}`);
  }

  function answer(answer: string) {
    if (!randomProblem.value) return;

    if (randomProblem.value.answer === answer) {
      increment();

      alert("Correct!");
    } else {
      alert(`Incorrect! The answer is ${randomProblem.value.answer}`);
    }

    // Mark the problem as selected
    selectedProblems.add(randomProblem.value);
    randomSiteName.value = null;
    randomProblem.value = null;

  }

  return { points, increment, sites, randomSiteName, randomProblem, selectRandomProblem, heuristics, answer, finalScore }
})

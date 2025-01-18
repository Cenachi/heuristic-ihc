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
  "visibility",
  "match",
  "userControl",
  "consistency",
  "errorPrevention",
  "recognition",
  "flexibility",
  "aesthetic",
  "help",
  "documentation",
];

export const useGameStore = defineStore('points', () => {
  const points = ref(0)

  const randomSiteName = ref<Site | null>();
  const randomProblem = ref<Problem | null>(null);
  const selectedProblems = new Set<Problem>(); // to avoid repeating problems
  const finalScore = ref(0);
  

  const sites = ref([
    {
      name: 'Google',
      problems: [
        {
          id: 1,
          description:
            'The Google search website doesn’t provide clear documentation on how to use shortcuts like quotes for precise searches.',
          answer: 'documentation',
        },
        {
          id: 2,
          description:
            "When searching for common errors, Google doesn't differentiate between developer-oriented and user-oriented solutions, causing confusion.",
          answer: 'match',
        },
        {
          id: 3,
          description:
            "The search bar suggestions aren't visible immediately after typing a query, making the system status unclear.",
          answer: 'visibility',
        },
      ],
    },
    {
      name: 'Amazon',
      problems: [
        {
          id: 4,
          description:
            'Product categories are sometimes inconsistent with user expectations, leading to confusion.',
          answer: 'consistency',
        },
        {
          id: 5,
          description:
            'The checkout page doesn’t provide a clear way to undo or modify an order, limiting user control.',
          answer: 'userControl',
        },
        {
          id: 6,
          description:
            'Search results often show unrelated products due to lack of error prevention in filtering options.',
          answer: 'errorPrevention',
        },
      ],
    },
    {
      name: 'YouTube',
      problems: [
        {
          id: 7,
          description:
            'The autoplay feature is not easily visible to users, leading to confusion when videos play automatically.',
          answer: 'visibility',
        },
        {
          id: 8,
          description:
            'Video categories sometimes mix unrelated content, making it hard for users to find what they’re looking for.',
          answer: 'consistency',
        },
        {
          id: 9,
          description:
            'The settings menu uses jargon unfamiliar to average users, reducing ease of understanding.',
          answer: 'match',
        },
      ],
    },
    {
      name: 'Facebook',
      problems: [
        {
          id: 10,
          description:
            'Privacy settings are hidden deep in the menu, making it difficult for users to recognize and change them.',
          answer: 'recognition',
        },
        {
          id: 11,
          description:
            'Friend suggestions clutter the interface, reducing aesthetic and minimalist design.',
          answer: 'aesthetic',
        },
        {
          id: 12,
          description:
            'The help center provides lengthy articles but lacks concise instructions for common issues.',
          answer: 'documentation',
        },
      ],
    },
    {
      name: 'Netflix',
      problems: [
        {
          id: 13,
          description:
            "The 'Continue Watching' section doesn’t allow users to easily remove items, reducing user control.",
          answer: 'userControl',
        },
        {
          id: 14,
          description:
            'Titles in non-native languages often don’t have translated descriptions, mismatching user expectations.',
          answer: 'match',
        },
        {
          id: 15,
          description:
            'Errors while streaming only show cryptic codes, making it hard for users to diagnose the problem.',
          answer: 'help',
        },
      ],
    },
    {
      name: 'Twitter',
      problems: [
        {
          id: 16,
          description:
            'The character counter is not prominently visible when composing a tweet, reducing visibility of system status.',
          answer: 'visibility',
        },
        {
          id: 17,
          description:
            'User options for muting or blocking accounts are buried in submenus, reducing flexibility and efficiency.',
          answer: 'flexibility',
        },
        {
          id: 18,
          description:
            'Error messages during login do not guide users clearly to resolve the issue.',
          answer: 'help',
        },
      ],
    },
  ].slice(0, 1)); // Limit to one site for now

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

  return { points, increment, sites, randomSiteName, randomProblem, selectRandomProblem, heuristics, answer, finalScore}
})

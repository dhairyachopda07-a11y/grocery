import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Authentic Kanda Batata Poha',
    hindiTitle: 'कांदा बटाटा पोहा',
    description: 'A beloved western Indian breakfast of fluffy flattened rice tossed with golden potatoes, crisp peanuts, aromatic curry leaves, and lemon.',
    prepTime: '5 mins',
    cookTime: '12 mins',
    servings: 3,
    difficulty: 'Easy',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    productIds: ['prod-potato-03', 'prod-onion-04', 'prod-turmeric-19', 'prod-herbs-32', 'prod-chilli-lemon-35'],
    instructions: [
      'Gently rinse poha under a colander with cold water for 30 seconds and drain well. Fluff with a fork and sprinkle 1/2 tsp salt.',
      'Heat 2 tbsp oil in a pan. Fry peanuts until crunchy, then set aside.',
      'In the same pan, splutter mustard seeds and cumin. Add diced potatoes and sauté covered on low heat until fork-tender.',
      'Stir in chopped onions, green chillies, and curry leaves; sauté until onions turn translucent.',
      'Add turmeric powder, drained poha, and reserved peanuts. Toss gently on low heat for 2 minutes.',
      'Garnish with fresh chopped coriander and a generous squeeze of Kagzi lemon. Serve hot.'
    ]
  },
  {
    id: 'recipe-2',
    title: 'Homestyle Toor Dal Tadka',
    hindiTitle: 'तड़का दाल और जीरा राइस',
    description: 'Comforting, protein-dense yellow pigeon peas simmered with turmeric and tempered with sizzling garlic, cumin, and Kashmiri dry red chillies.',
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Easy',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    productIds: ['prod-toordal-07', 'prod-tomato-02', 'prod-onion-04', 'prod-ginger-garlic-27', 'prod-salt-31', 'prod-turmeric-19'],
    instructions: [
      'Wash 1 cup unpolished toor dal thoroughly. Pressure cook with 3 cups water, 1/2 tsp turmeric powder, and salt for 3-4 whistles.',
      'Whisk the cooked dal to a smooth, velvety consistency.',
      'In a tadka pan, heat 2 tbsp ghee or mustard oil. Add cumin seeds and let them sizzle.',
      'Add minced garlic, ginger, and green chillies. Sauté until golden and fragrant.',
      'Add finely chopped onions and diced tomatoes; cook until oil releases from the edges.',
      'Pour the aromatic sizzling tadka directly over the bubbling dal. Cover with lid for 2 minutes to trap the smoke and aroma.',
      'Garnish with fresh coriander leaves and serve with steaming aged basmati rice.'
    ]
  },
  {
    id: 'recipe-3',
    title: 'Spiced Paneer Bhurji with Roti',
    hindiTitle: 'मसालेदार पनीर भुर्जी',
    description: 'Scrambled artisanal buffalo milk cottage cheese sautéed with crunchy capsicum, sweet onions, and ripe tomatoes.',
    prepTime: '5 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    category: 'Quick Dinner',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    productIds: ['prod-paneer-16', 'prod-capsicum-26', 'prod-onion-04', 'prod-tomato-02', 'prod-turmeric-19'],
    instructions: [
      'Crumble 200g fresh malai paneer with fingers into coarse, soft bites.',
      'Heat 1.5 tbsp oil or butter in a skillet. Add cumin seeds and chopped green chillies.',
      'Sauté diced onions until golden, then add finely diced green capsicum and cook for 2 minutes to retain crunch.',
      'Add chopped tomatoes, turmeric, coriander powder, and salt. Cook until soft.',
      'Toss in crumbled paneer and mix gently over medium heat for 2-3 minutes. Do not overcook to keep paneer velvety soft.',
      'Finish with chopped coriander and serve hot with fresh whole wheat rotis.'
    ]
  },
  {
    id: 'recipe-4',
    title: 'Monsoon Adrak Elaichi Masala Chai',
    hindiTitle: 'कड़क अदरक-इलायची चाय',
    description: 'Invigorating, full-bodied CTC tea brewed with fresh crushed ginger root, green cardamom pods, and creamy milk.',
    prepTime: '2 mins',
    cookTime: '8 mins',
    servings: 2,
    difficulty: 'Easy',
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    productIds: ['prod-tea-23', 'prod-milk-08', 'prod-ginger-garlic-27', 'prod-jaggery-28'],
    instructions: [
      'In a saucepan, bring 1 cup water to a vigorous boil with 1 inch crushed fresh ginger and 2 crushed green cardamoms.',
      'Add 2 teaspoons strong CTC black tea and let it simmer for 2 minutes to extract essential oils.',
      'Pour in 1 cup fresh pasteurized milk and bring to a frothy boil.',
      'Reduce heat to low and simmer for 3 minutes until the brew develops a deep golden caramel hue.',
      'Stir in organic jaggery or natural sugar to taste.',
      'Strain through a fine mesh sieve into earthen kulhad cups and enjoy with Parle-G biscuits.'
    ]
  }
];

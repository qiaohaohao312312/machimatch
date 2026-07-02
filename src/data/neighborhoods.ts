import type { Neighborhood } from '../types'

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 1,
    name: 'Shimokitazawa',
    district: '下北沢',
    city: 'Tokyo',
    intro:
      'Indie cafés, second-hand bookshops, and a lively music scene tucked into narrow lanes. This is where Tokyo\'s creatives come to breathe—unhurried, unglamorous, and entirely itself.',
    dayOpening:
      'You wake to a bicycle bell on a quiet backstreet. Light filters soft through persimmon leaves outside your window.',
    dayMoments: [
      {
        time: '8:30 am',
        text: 'Your cat settles on the sill while you walk three minutes to a kissaten serving the same blend since 1978. No wifi. Perfect.',
      },
      {
        time: '12:00 pm',
        text: 'Lunch is a handwritten-menu restaurant with six seats and one dish of the day. The owner asks where you\'re from. You stay longer than you meant to.',
      },
      {
        time: '4:00 pm',
        text: 'You find a record shop in a basement you\'ll return to. The jacket you didn\'t know you needed is folded on a bench outside a vintage store.',
      },
      {
        time: '7:00 pm',
        text: 'Vintage shops glow amber. Someone plays guitar in the alley behind the theatre. You don\'t need to be anywhere else.',
      },
    ],
    tags: ['walkable', 'indie cafés', 'quiet mornings', 'cat-friendly', 'creative vibe'],
    mapQuery: 'Shimokitazawa, Setagaya, Tokyo',
    coordinates: [35.6617, 139.6678],
    shop: {
      name: 'Kissa Model',
      category: 'coffee shops',
      blurb: 'A kissaten serving the same blend since 1978. No wifi. Perfect.',
      emoji: '☕',
      coordinates: [35.6621, 139.6685],
    },
  },
  {
    id: 2,
    name: 'Yanaka',
    district: '谷中',
    city: 'Tokyo',
    intro:
      'One of Tokyo\'s last intact shitamachi neighborhoods. Low-rise, unhurried, and genuinely friendly—cats sleep on every corner and neighbors still say good morning to strangers.',
    dayOpening:
      'A temple bell somewhere close. The street below your window is already warm with early light and the smell of someone\'s breakfast.',
    dayMoments: [
      {
        time: '7:00 am',
        text: 'A cat sleeps in the sun outside the old rice shop. You pick up bread from the bakery that has been here since before you were born.',
      },
      {
        time: '10:00 am',
        text: 'The cemetery walk is surprisingly peaceful—cherry trees, soft gravel, nobody rushing. You sit on a stone bench for twenty minutes and feel no guilt about it.',
      },
      {
        time: '3:00 pm',
        text: 'A pottery class runs in a studio down the lane. You watch through the open door. The teacher notices and invites you in.',
      },
      {
        time: '6:30 pm',
        text: 'The shotengai lights flicker on. The smell of yakitori drifts past. An elderly neighbor waves from her doorway. This is Tokyo without performance.',
      },
    ],
    tags: ['shitamachi', 'quiet streets', 'cats everywhere', 'historic feel', 'slow mornings'],
    mapQuery: 'Yanaka, Taito, Tokyo',
    coordinates: [35.7276, 139.7671],
    shop: {
      name: 'Yanaka Ginza Bakery',
      category: 'bakery',
      blurb: 'A bakery that has been here since before you were born—still the neighborhood\'s first stop each morning.',
      emoji: '🥐',
      coordinates: [35.7272, 139.7665],
    },
  },
  {
    id: 3,
    name: 'Nakameguro',
    district: '中目黒',
    city: 'Tokyo',
    intro:
      'A canal lined with boutiques and restaurants that feel designed for exactly the life you want to live. Stylish without trying too hard—the best kind.',
    dayOpening:
      'The canal catches the morning light before the city wakes up. You can hear water. You don\'t hear traffic yet.',
    dayMoments: [
      {
        time: '8:00 am',
        text: 'You walk the canal with your coffee and the world feels manageable. The cherry trees are bare now but beautiful in a different way—structure, not spectacle.',
      },
      {
        time: '11:00 am',
        text: 'A good independent bookshop opens at ten. You spend an hour. You leave with two books and a poster you\'ll put up tonight.',
      },
      {
        time: '1:00 pm',
        text: 'Lunch at a restaurant you\'ll tell people about. The chef comes out. It was simple. It was exactly right.',
      },
      {
        time: '9:00 pm',
        text: 'Walking home along the canal at night, the reflections in the water feel like a reward for choosing this neighborhood over a cheaper one.',
      },
    ],
    tags: ['canal walks', 'boutiques', 'great restaurants', 'stylish', 'weekend energy'],
    mapQuery: 'Nakameguro, Meguro, Tokyo',
    coordinates: [35.6429, 139.6986],
    shop: {
      name: 'Canal Side Books',
      category: 'bookshops',
      blurb: 'A good independent bookshop that opens at ten and always has exactly what you didn\'t know you needed.',
      emoji: '📚',
      coordinates: [35.6433, 139.6979],
    },
  },
  {
    id: 4,
    name: 'Sangenjaya',
    district: '三軒茶屋',
    city: 'Tokyo',
    intro:
      'Slightly rougher around the edges, deeply local, and wonderful for it. Great izakayas, independent shops, real neighborhood life—without the Insta crowd.',
    dayOpening:
      'Your building\'s hallway smells like someone is already cooking. The convenience store downstairs has been open since 5am. The neighborhood doesn\'t sleep much.',
    dayMoments: [
      {
        time: '9:00 am',
        text: 'The covered arcade maze—the Triangle—smells of last night and fresh things. The morning market is wrapping up. You grab a melon bread from the 24-hour bakery.',
      },
      {
        time: '2:00 pm',
        text: 'You find a vinyl record shop you\'ll return to. The owner doesn\'t speak much but hands you exactly the right record.',
      },
      {
        time: '7:30 pm',
        text: 'The izakayas fill with salarymen and students side by side. You stay too late, talking to the couple next to you about nothing important. The beer is cold. The night is warm.',
      },
      {
        time: '11:00 pm',
        text: 'On the train home—three stops—you\'re already thinking about tomorrow. This neighborhood has that effect.',
      },
    ],
    tags: ['local izakayas', 'record shops', 'real Tokyo', 'affordable', 'lively nights'],
    mapQuery: 'Sangenjaya, Setagaya, Tokyo',
    coordinates: [35.6430, 139.6700],
    shop: {
      name: 'Triangle Vinyl',
      category: 'record shop',
      blurb: 'A vinyl record shop you\'ll return to—the owner doesn\'t speak much but hands you exactly the right record.',
      emoji: '💿',
      coordinates: [35.6434, 139.6694],
    },
  },
  {
    id: 5,
    name: 'Harajuku',
    district: '原宿 (裏)',
    city: 'Tokyo',
    intro:
      'Past the crowds, into the quiet streets behind Omotesando—a neighborhood that somehow feels both fashionable and intimate, as if it\'s been waiting for exactly you.',
    dayOpening:
      'The street outside is narrow and sun-lit. Someone is arranging flowers in front of a gallery that hasn\'t opened yet. The boulangerie opens in twenty minutes.',
    dayMoments: [
      {
        time: '9:30 am',
        text: 'The café you choose has three tables and a playlist you wish you could take home. The croissant is worth everything.',
      },
      {
        time: '1:00 pm',
        text: 'A friend visits and you wander Ura-Harajuku together—the real one, where the designers are young and the prices are not yet what they will become.',
      },
      {
        time: '5:00 pm',
        text: 'A gallery opening, invite-only, and somehow you\'re inside. The work is strange and you can\'t stop looking at it.',
      },
      {
        time: '9:30 pm',
        text: 'You pass a jazz bar with the door open. You don\'t go in tonight. But you will. You already know you will.',
      },
    ],
    tags: ['backstreets', 'galleries', 'design-forward', 'quiet pockets', 'independent fashion'],
    mapQuery: 'Ura-Harajuku, Shibuya, Tokyo',
    coordinates: [35.6694, 139.7025],
    shop: {
      name: 'Ura Gallery',
      category: 'art gallery',
      blurb: 'A small invite-only gallery tucked behind Omotesando, showing strange, wonderful work you can\'t stop looking at.',
      emoji: '🎨',
      coordinates: [35.6690, 139.7031],
    },
  },
]

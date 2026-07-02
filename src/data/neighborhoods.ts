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
    shops: [
      {
        name: 'City Country City',
        category: 'coffee shops',
        blurb: 'A café and record shop run by musician Keiichi Sogabe, four floors up in an old apartment building — turntables at the counter, handwritten notes on every sleeve.',
        emoji: '☕',
        coordinates: [35.6610, 139.6683],
      },
      {
        name: '古書ビビビ (Kosho Bibibi)',
        category: 'bookshops',
        blurb: 'A used bookshop on Chazawa-dori — around 13,000 secondhand books, all handpicked by the owner.',
        emoji: '📚',
        coordinates: [35.6605, 139.6695],
      },
      {
        name: 'レコードステーション (Record Station)',
        category: 'record shop',
        blurb: 'A record and cassette shop in the Ichiban-gai arcade, rooted in black music, city pop, and anime soundtracks.',
        emoji: '💿',
        coordinates: [35.6628, 139.6665],
      },
    ],
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
    shops: [
      {
        name: 'hitotema',
        category: 'bakery',
        blurb: 'A neighborhood bakery in Yanaka Ginza, baking in a lava-stone oven — the shotengai\'s first stop each morning.',
        emoji: '🥐',
        coordinates: [35.7277, 139.7656],
      },
      {
        name: 'やなかしっぽや (Yanaka Shippoya)',
        category: 'local restaurants',
        blurb: 'Stick-shaped baked donuts shaped like cat tails, with more than ten patterns rotating through the case — a Yanaka Ginza institution.',
        emoji: '🍩',
        coordinates: [35.7278, 139.7651],
      },
      {
        name: '谷中凸凹堂 (Yanaka Dekoboko-do)',
        category: 'gift shop',
        blurb: 'Handmade cat accessories in natural stone — the souvenir everyone ends up buying on their way out of the cat town.',
        emoji: '🐱',
        coordinates: [35.7275, 139.7649],
      },
    ],
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
    shops: [
      {
        name: 'COW BOOKS 中目黒',
        category: 'bookshops',
        blurb: 'A secondhand bookshop curated by former Living editor-in-chief Yataro Matsuura — around 2,000 hand-picked titles in literature and essays.',
        emoji: '📚',
        coordinates: [35.6438, 139.6969],
      },
      {
        name: 'craft tea, coffee',
        category: 'coffee shops',
        blurb: 'A dog-friendly café right on the Meguro River, pouring Japanese tea and coffee under the cherry trees.',
        emoji: '☕',
        coordinates: [35.6448, 139.6976],
      },
      {
        name: 'JANTIQUE (ジャンティック)',
        category: 'vintage boutique',
        blurb: 'Nakameguro\'s best-known vintage shop, drawing buyers from overseas for its menswear and womenswear alike.',
        emoji: '👗',
        coordinates: [35.6420, 139.6995],
      },
    ],
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
    shops: [
      {
        name: 'Small World (スモールワールド)',
        category: 'record shop',
        blurb: 'A record shop and bar between Sangenjaya and Shimokitazawa, five people deep, stocked with avant-garde electronic and indie rock.',
        emoji: '💿',
        coordinates: [35.6438, 139.6695],
      },
      {
        name: '天狗食堂 (Tengu Shokudo)',
        category: 'local restaurants',
        blurb: 'A DJ bar with a dance floor in the back — the owner\'s gyoza and curry keep the regulars coming back.',
        emoji: '🍶',
        coordinates: [35.6425, 139.6705],
      },
      {
        name: '赤星 (Akaboshi)',
        category: 'local restaurants',
        blurb: 'A counter-seat izakaya with 90s J-pop on the speakers and a rope curtain out front — retro and effortlessly stylish.',
        emoji: '🏮',
        coordinates: [35.6432, 139.6710],
      },
    ],
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
    shops: [
      {
        name: 'FAN',
        category: 'independent fashion',
        blurb: 'A half-basement select shop down a backstreet, buying across mode and street with over a decade of eye behind it.',
        emoji: '🎨',
        coordinates: [35.6688, 139.7032],
      },
      {
        name: 'GR8',
        category: 'independent fashion',
        blurb: 'A select shop known to Tokyo\'s style icons, with an interior built to be felt as much as browsed.',
        emoji: '👕',
        coordinates: [35.6698, 139.7020],
      },
      {
        name: 'UNION',
        category: 'independent fashion',
        blurb: 'One of Ura-Harajuku\'s longest-running independent select shops, with a point of view that hasn\'t chased trends.',
        emoji: '🧥',
        coordinates: [35.6692, 139.7038],
      },
    ],
  },
]

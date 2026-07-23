// UI string dictionary. Keys are flat; each has en / ja / zh.
// Interpolation tokens like {city} {name} {rank} {n} {max} {k} are replaced by t().
// Proper nouns (brand "machimatch", city/neighborhood names) are intentionally
// not translated. AI-generated story text is localized via the API, not here.

export type Lang = 'en' | 'ja' | 'zh'

export const STRINGS: Record<string, Record<Lang, string>> = {
  // ── Landing ──
  'landing.headline':   { en: 'Where Will Your Next Home Be?', ja: 'あなたの次の住まいは、どこに？', zh: '你的下一个家，会在哪里？' },
  'landing.sub':        { en: 'The first step of finding a home is the street. Before the apartment, there is a feeling.', ja: '住まい探しの第一歩は、街から。部屋の前に、まず「感覚」がある。', zh: '找家的第一步，是从街区开始。在公寓之前，先有一种感觉。' },
  'landing.placeholder':{ en: 'Type a city...', ja: '都市を入力…', zh: '输入一个城市…' },
  'landing.go':         { en: 'Go →', ja: '決定 →', zh: '开始 →' },
  'landing.anywhere':   { en: 'Anywhere ✦', ja: 'どこでも ✦', zh: '任何地方 ✦' },
  'landing.mobileHint': { en: 'The first step of finding a home is the street.', ja: '住まい探しの第一歩は、街から。', zh: '找家的第一步，是从街区开始。' },

  // ── Quiz ──
  'quiz.q1': { en: 'What Window Would You Like to Wake Up To?', ja: 'どんな窓の景色で目覚めたいですか？', zh: '你想在怎样的窗景中醒来？' },
  'quiz.q2': { en: 'What Would You Like Within a Five-Minute Walk?', ja: '徒歩5分以内に、何があってほしいですか？', zh: '步行五分钟内，你希望有什么？' },
  'quiz.q3': { en: 'Do You Prefer a Quiet Neighborhood or a Lively One?', ja: '静かな街と賑やかな街、どちらが好みですか？', zh: '你更喜欢安静的街区，还是热闹的街区？' },
  'quiz.q4': { en: 'How Important Is It for You to Get to the City Center Quickly?', ja: '都心へすぐ出られることは、どのくらい重要ですか？', zh: '能快速到达市中心，对你有多重要？' },
  'quiz.q5': { en: 'Other things you would like us to know…', ja: 'その他、伝えておきたいこと…', zh: '还有什么想让我们知道的…' },
  'quiz.generate': { en: 'Generate', ja: '結果を見る', zh: '生成结果' },
  'quiz.forCity':  { en: 'for {city}', ja: '{city} で', zh: '在 {city}' },
  'quiz.next':     { en: 'Continue to next question', ja: '次の質問へ', zh: '继续下一题' },

  // ── Window options ──
  'win.green':      { en: 'green view', ja: '緑の眺め', zh: '绿色的景致' },
  'win.green.sub':  { en: 'with trees', ja: '木々に囲まれて', zh: '有树木相伴' },
  'win.street':     { en: 'busy, lively', ja: '賑やかな', zh: '热闹的' },
  'win.street.sub': { en: 'city street', ja: '街の通り', zh: '城市街道' },
  'win.city':       { en: 'city skyline', ja: '都会の空', zh: '城市天际线' },
  'win.city.sub':   { en: 'high above', ja: '高層階から', zh: '在高处' },

  // ── Walk amenities ──
  'walk.station':     { en: 'train / metro station', ja: '駅（電車・地下鉄）', zh: '车站（地铁/电车）' },
  'walk.coffee':      { en: 'coffee shops', ja: 'カフェ', zh: '咖啡馆' },
  'walk.restaurants': { en: 'local restaurants', ja: '地元の飲食店', zh: '本地餐馆' },
  'walk.bars':        { en: 'bars & izakaya', ja: 'バー・居酒屋', zh: '酒吧和居酒屋' },
  'walk.supermarket': { en: 'supermarket', ja: 'スーパー', zh: '超市' },
  'walk.conbini':     { en: 'convenience stores', ja: 'コンビニ', zh: '便利店' },
  'walk.bakery':      { en: 'bakery', ja: 'パン屋', zh: '面包店' },
  'walk.parks':       { en: 'parks & nature', ja: '公園・自然', zh: '公园和自然' },
  'walk.gyms':        { en: 'gyms', ja: 'ジム', zh: '健身房' },
  'walk.bookshops':   { en: 'bookshops', ja: '書店', zh: '书店' },
  'walk.coworking':   { en: 'co-working space', ja: 'コワーキング', zh: '联合办公空间' },
  'walk.clinic':      { en: 'clinic & pharmacy', ja: 'クリニック・薬局', zh: '诊所和药店' },
  'walk.malls':       { en: 'big shopping malls', ja: '大型ショッピングモール', zh: '大型购物中心' },
  'walk.nightmarket': { en: 'night markets', ja: '夜市', zh: '夜市' },

  // ── Vibe slider ──
  'vibe.quiet':  { en: 'Quiet', ja: '静か', zh: '安静' },
  'vibe.lively': { en: 'Lively', ja: '賑やか', zh: '热闹' },
  'vibe.f1': { en: 'Very quiet and peaceful', ja: 'とても静かで穏やか', zh: '非常安静祥和' },
  'vibe.f2': { en: 'Mostly quiet', ja: 'だいたい静か', zh: '大致安静' },
  'vibe.f3': { en: 'A comfortable middle', ja: 'ほどよいバランス', zh: '舒适的中间地带' },
  'vibe.f4': { en: 'Quite lively', ja: 'かなり賑やか', zh: '相当热闹' },
  'vibe.f5': { en: 'Buzzing with energy', ja: '活気にあふれる', zh: '充满活力' },

  // ── Priority scale (by value) ──
  'prio.5': { en: 'must be within 10 min', ja: '10分以内が必須', zh: '必须在10分钟内' },
  'prio.4': { en: 'within 20 min', ja: '20分以内', zh: '20分钟内' },
  'prio.3': { en: 'within 30 min', ja: '30分以内', zh: '30分钟内' },
  'prio.2': { en: 'up to 45 min is fine', ja: '45分までならOK', zh: '45分钟内都行' },
  'prio.1': { en: "don't mind", ja: '気にしない', zh: '无所谓' },

  // ── FreeText ──
  'free.placeholder': { en: 'I have a cat...', ja: '猫を飼っています…', zh: '我养了一只猫…' },

  // ── Loading ──
  'loading.l1': { en: 'Finding your street…', ja: 'あなたの街を探しています…', zh: '正在寻找你的街区…' },
  'loading.l2': { en: 'Listening to the neighborhood…', ja: '街の声に耳をすませて…', zh: '正在聆听这个街区…' },
  'loading.l3': { en: 'Reading the morning light…', ja: '朝の光を読み取って…', zh: '正在读取清晨的光…' },
  'loading.l4': { en: 'Mapping the feeling…', ja: '感覚を地図に描いて…', zh: '正在描绘这种感觉…' },
  'loading.l5': { en: 'Almost there…', ja: 'もうすぐです…', zh: '就快好了…' },

  // ── Results ──
  'res.title':       { en: '5 neighborhoods for you', ja: 'あなたへの5つの街', zh: '为你挑选的5个街区' },
  'res.rank':        { en: 'no.{rank}', ja: 'No.{rank}', zh: '第{rank}' },
  'res.matches':     { en: 'matches your picks', ja: '希望に合致', zh: '符合你的选择' },
  'res.localPicks':  { en: 'Local picks', ja: '地元のおすすめ', zh: '本地推荐' },
  'res.openMaps':    { en: 'Open in Google Maps', ja: 'Google マップで開く', zh: '在 Google 地图中打开' },
  'res.startOver':   { en: 'Start over', ja: '最初から', zh: '重新开始' },
  'res.findHousing': { en: 'Find a place to live here', ja: 'ここで住まいを探す', zh: '在这里找房子' },
  'res.tapPin':      { en: 'tap a pin to explore', ja: 'ピンをタップして見る', zh: '点击标记查看' },
  'res.mapError':    { en: 'map error', ja: '地図の読み込みエラー', zh: '地图加载错误' },
  'res.heading':     { en: '5 neighborhoods for you', ja: 'あなたへの5つの街', zh: '为你挑选的5个街区' },

  // ── Housing ──
  'h.back':      { en: 'back to neighborhoods', ja: '街の一覧に戻る', zh: '返回街区列表' },
  'h.title':     { en: 'Find a place in {name}', ja: '{name} で住まいを探す', zh: '在 {name} 找房子' },
  'h.sub':       { en: "Tell us how you'd live here, and we'll open real listings for you.", ja: 'どんな暮らしをしたいか教えてください。実際の物件情報を開きます。', zh: '告诉我们你想怎样在这里生活，我们会为你打开真实房源。' },
  'h.stay':      { en: 'How long are you staying?', ja: 'どのくらい滞在しますか？', zh: '你打算住多久？' },
  'h.roomType':  { en: 'Room type', ja: '間取り', zh: '户型' },
  'h.minSize':   { en: 'Minimum size', ja: '最低面積', zh: '最小面积' },
  'h.budget':    { en: 'Monthly budget', ja: '家賃の予算（月）', zh: '每月预算' },
  'h.walk':      { en: 'Walk to station', ja: '駅までの徒歩', zh: '到车站的步行时间' },
  'h.listings':  { en: 'Real listings', ja: '実際の物件', zh: '真实房源' },
  'h.note':      { en: "These open the real housing sites for {name}. SUUMO opens with your filters applied; on the others, fine-tune once you're there. Machimatch doesn't list or price homes itself.", ja: '{name} の実際の物件サイトを開きます。SUUMO は条件を適用した状態で開きます。その他はサイト上で調整してください。Machimatch 自体は物件情報や価格を扱いません。', zh: '这些会打开 {name} 的真实房源网站。SUUMO 会带着你的筛选条件打开；其他网站请到站内再微调。Machimatch 本身不提供房源或价格。' },

  // ── Stay / room / size / budget / walk options ──
  'stay.short':      { en: 'Under 1 month', ja: '1ヶ月未満', zh: '一个月以内' },
  'stay.short.hint': { en: 'furnished · short stay', ja: '家具付き・短期', zh: '带家具·短租' },
  'stay.mid':        { en: '1–6 months', ja: '1〜6ヶ月', zh: '1–6个月' },
  'stay.mid.hint':   { en: 'monthly · furnished', ja: 'マンスリー・家具付き', zh: '月租·带家具' },
  'stay.long':       { en: '6 months +', ja: '6ヶ月以上', zh: '6个月以上' },
  'stay.long.hint':  { en: 'local lease · unfurnished', ja: '一般賃貸・家具なし', zh: '本地租约·无家具' },

  'room.any':    { en: 'Any', ja: '指定なし', zh: '不限' },
  'room.studio': { en: 'Studio', ja: 'ワンルーム', zh: '单间' },
  'room.1br':    { en: '1 bedroom', ja: '1寝室', zh: '一室' },
  'room.2br':    { en: '2 bedrooms', ja: '2寝室', zh: '两室' },
  'room.3br':    { en: '3 bedrooms +', ja: '3寝室以上', zh: '三室以上' },

  'opt.any':  { en: 'Any', ja: '指定なし', zh: '不限' },
  'size.m2':  { en: '{n} m²+', ja: '{n}m²以上', zh: '{n}m²以上' },
  'walk.min': { en: '≤ {n} min', ja: '{n}分以内', zh: '≤{n}分钟' },

  // ── Housing provider notes ──
  'prov.airbnb.short':   { en: 'furnished · short stay', ja: '家具付き・短期', zh: '带家具·短租' },
  'prov.airbnb.monthly': { en: 'furnished · set monthly dates', ja: '家具付き・月単位で設定', zh: '带家具·可设月租日期' },
  'prov.booking':        { en: 'short stays · nightly', ja: '短期・1泊単位', zh: '短租·按晚计' },
  'prov.suumo.filtered': { en: 'your filters applied · rent, size, walk, layout', ja: '条件適用済み・家賃／面積／徒歩／間取り', zh: '已应用筛选·租金/面积/步行/户型' },
  'prov.suumo.big':      { en: "Japan's largest rental site", ja: '日本最大の賃貸サイト', zh: '日本最大的租房网站' },
  'prov.athome':         { en: 'major nationwide rental site', ja: '全国規模の大手賃貸サイト', zh: '全国性大型租房网站' },
  'prov.homes':          { en: 'filtered by neighborhood', ja: 'エリアで絞り込み', zh: '按街区筛选' },
  'prov.oakhouse':       { en: 'English · monthly · share houses', ja: '英語対応・マンスリー・シェアハウス', zh: '英文·月租·合租房' },
}

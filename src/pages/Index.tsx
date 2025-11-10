import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import PrayerRosary from '@/components/PrayerRosary';

const prayers = [
  {
    title: 'Отче наш',
    text: 'Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли. Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избави нас от лукаваго.',
  },
  {
    title: 'Богородице Дево, радуйся',
    text: 'Богородице Дево, радуйся, Благодатная Марие, Господь с Тобою; благословена Ты в женах и благословен плод чрева Твоего, яко Спаса родила еси душ наших.',
  },
  {
    title: 'Символ веры',
    text: 'Верую во единаго Бога Отца, Вседержителя, Творца небу и земли, видимым же всем и невидимым. И во единаго Господа Иисуса Христа, Сына Божия, Единороднаго, Иже от Отца рожденнаго прежде всех век...',
  },
  {
    title: 'Царю Небесный',
    text: 'Царю Небесный, Утешителю, Душе истины, Иже везде сый и вся исполняяй, Сокровище благих и жизни Подателю, прииди и вселися в ны, и очисти ны от всякия скверны, и спаси, Блаже, души наша.',
  },
];

const psalms = [
  {
    number: 1,
    text: `Блажен муж, иже не иде на совет нечестивых, и на пути грешных не ста, и на седалищи губителей не седе,\n\nНо в законе Господни воля его, и в законе Его поучится день и нощь.\n\nИ будет яко древо насажденое при исходищих вод, еже плод свой даст во время свое, и лист его не отпадет, и вся, елика аще творит, успеет.\n\nНе тако нечестивии, не тако, но яко прах, егоже возметает ветр от лица земли.\n\nСего ради не воскреснут нечестивии на суд, ниже грешницы в совет праведных.\n\nЯко весть Господь путь праведных, и путь нечестивых погибнет.`
  },
  {
    number: 23,
    text: `Господь просвещение мое и Спаситель мой, кого убоюся? Господь защититель живота моего, от кого устрашуся?\n\nВнегда приближатися на мя злобующим, снести плоти моя, оскорбляющии мя и врази мои, тии изнемогоша и падоша.\n\nАще ополчится на мя полк, не убоится сердце мое: аще востанет на мя брань, на Него аз уповаю.\n\nЕдино просих от Господа, то взыщу: еже жити ми в дому Господни вся дни живота моего, зрети ми красоту Господню, и посещати храм святый Его.\n\nЯко скры мя в селении Своем в день зол моих, покры мя в крове селения Своего, на камени вознесе мя.`
  },
  {
    number: 51,
    text: `Помилуй мя, Боже, по велицей милости Твоей, и по множеству щедрот Твоих очисти беззаконие мое.\n\nНаипаче омый мя от беззакония моего, и от греха моего очисти мя.\n\nЯко беззаконие мое аз знаю, и грех мой предо мною есть выну.\n\nТебе единому согреших и лукавое пред Тобою сотворих, яко да оправдишися во словесех Твоих, и победиши внегда судити Ти.\n\nСе бо, в беззакониих зачат есмь, и во гресех роди мя мати моя.\n\nСе бо, истину возлюбил еси, безвестная и тайная премудрости Твоея явил ми еси.\n\nОкропиши мя иссопом, и очищуся, омыеши мя, и паче снега убелюся.`
  },
  {
    number: 91,
    text: `Живый в помощи Вышняго, в крове Бога Небеснаго водворится.\n\nРечет Господеви: Заступник мой еси и Прибежище мое, Бог мой, и уповаю на Него.\n\nЯко Той избавит тя от сети ловчи, и от словесе мятежна, плещма Своима осенит тя, и под криле Его надеешися: оружием обыдет тя истина Его.\n\nНе убоишися от страха нощнаго, от стрелы летящия во дни, от вещи во тме преходящия, от сряща, и беса полуденнаго.\n\nПадет от страны твоея тысяща, и тма одесную тебе, к тебе же не приближится, обаче очима твоима смотриши, и воздаяние грешников узриши.\n\nЯко Ты, Господи, упование мое, Вышняго положил еси прибежище твое.`
  },
  {
    number: 103,
    text: `Благослови, душе моя, Господа. Господи Боже мой, возвеличился еси зело. Во исповедание и в велелепоту облеклся еси.\n\nОдеяйся светом, яко ризою, простираяй небо, яко кожу.\n\nПокрываяй водами превыспренняя Своя, полагаяй облаки на восхождение Свое, ходяй на крилу ветреню.\n\nТворяй ангелы Своя духи, и слуги Своя пламень огненный.\n\nОсновываяй землю на тверди ея, не преклонится в век века.\n\nБездна, яко риза, одеяние ея, на горах станут воды, от запрещения Твоего побегнут, от гласа грома Твоего убоятся.\n\nВосходят горы и нисходят поля в место, еже основал еси им.`
  },
];

const saints = [
  {
    name: 'Преподобный Сергий Радонежский',
    dates: '1314-1392',
    image: 'https://cdn.poehali.dev/projects/1ca71cbf-bbd4-4703-ad28-dec695fe2fec/files/46c56caa-06c7-4063-8124-c1b2e2c1ceef.jpg',
    description: 'Основатель Троице-Сергиевой лавры, игумен земли Русской',
    fullBio: 'Родился в семье боярина Кирилла и Марии. С юных лет стремился к монашеской жизни. После смерти родителей вместе с братом Стефаном основал пустынь на холме Маковец. Основал Троице-Сергиеву лавру, ставшую духовным центром Руси. Благословил князя Димитрия Донского на Куликовскую битву. Прославился чудесами и даром прозорливости. Почитается как один из величайших святых земли Русской.'
  },
  {
    name: 'Святитель Николай Чудотворец',
    dates: '270-345',
    image: 'https://cdn.poehali.dev/projects/1ca71cbf-bbd4-4703-ad28-dec695fe2fec/files/8aa3b141-6bd7-4b0a-a6e5-01119cee58db.jpg',
    description: 'Архиепископ Мир Ликийских, великий чудотворец',
    fullBio: 'Родился в городе Патара в Малой Азии. С детства отличался благочестием и милосердием. Стал епископом города Миры Ликийские. Участвовал в Первом Вселенском Соборе в Никее. Прославился многочисленными чудесами: спасал моряков от бури, избавлял от нищеты, защищал невинно осужденных. Особо почитается как покровитель путешествующих, детей и всех нуждающихся в помощи.'
  },
  {
    name: 'Преподобный Серафим Саровский',
    dates: '1754-1833',
    image: 'https://cdn.poehali.dev/projects/1ca71cbf-bbd4-4703-ad28-dec695fe2fec/files/37f95f9c-2a85-4a63-8fe3-c418dcfd6580.jpg',
    description: 'Великий подвижник и старец земли Русской',
    fullBio: 'Родился в Курске в семье купца. В 19 лет пришел в Саровскую пустынь. Прошел путь послушника, иеродиакона, иеромонаха. Подвизался в затворе и молчании. После многих лет уединения принял служение старчества. Известен приветствием "Радость моя!". Учил о стяжании Духа Святого как цели христианской жизни. Прославился многочисленными чудесами и исцелениями. Канонизирован в 1903 году.'
  },
  {
    name: 'Блаженная Матрона Московская',
    dates: '1881-1952',
    image: 'https://cdn.poehali.dev/projects/1ca71cbf-bbd4-4703-ad28-dec695fe2fec/files/15db32b6-eb80-4b41-8e70-7bd9a499b2d2.jpg',
    description: 'Слепая прозорливица и чудотворица',
    fullBio: 'Родилась в деревне Себино Тульской губернии слепой от рождения. С детства обладала даром прозорливости и исцеления. В 17 лет утратила способность ходить. В 1925 году переехала в Москву, где принимала всех страждущих. Предсказала начало Великой Отечественной войны. До конца жизни помогала людям молитвой и советом. Канонизирована в 2004 году. Её мощи покоятся в Покровском монастыре в Москве.'
  },
];

const calendarEvents = [
  { date: '7 января', event: 'Рождество Христово', type: 'major' },
  { date: '19 января', event: 'Крещение Господне', type: 'major' },
  { date: '15 февраля', event: 'Сретение Господне', type: 'major' },
  { date: '7 апреля', event: 'Благовещение', type: 'major' },
  { date: 'подвижная', event: 'Пасха - Воскресение Христово', type: 'major' },
  { date: '28 июля', event: 'День Крещения Руси', type: 'feast' },
  { date: '19 августа', event: 'Преображение Господне', type: 'major' },
  { date: '28 августа', event: 'Успение Богородицы', type: 'major' },
  { date: '21 сентября', event: 'Рождество Богородицы', type: 'major' },
  { date: '14 октября', event: 'Покров Пресвятой Богородицы', type: 'feast' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('prayers');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Cross" size={40} className="text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-primary">Православный Портал</h1>
          </div>
          <p className="text-lg text-muted-foreground">Духовная жизнь православного христианина</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-card/80 backdrop-blur">
            <TabsTrigger value="prayers" className="gap-2">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Молитвы</span>
            </TabsTrigger>
            <TabsTrigger value="psalms" className="gap-2">
              <Icon name="ScrollText" size={18} />
              <span className="hidden sm:inline">Псалмы</span>
            </TabsTrigger>
            <TabsTrigger value="saints" className="gap-2">
              <Icon name="Users" size={18} />
              <span className="hidden sm:inline">Святые</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="rosary" className="gap-2">
              <Icon name="Circle" size={18} />
              <span className="hidden sm:inline">Четки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prayers" className="animate-fade-in">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
                <Icon name="BookOpen" size={32} />
                Православные молитвы
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {prayers.map((prayer, index) => (
                  <AccordionItem key={index} value={`prayer-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                      {prayer.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
                        {prayer.text}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="psalms" className="animate-fade-in">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
                <Icon name="ScrollText" size={32} />
                Избранные псалмы
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {psalms.map((psalm) => (
                  <AccordionItem key={psalm.number} value={`psalm-${psalm.number}`}>
                    <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                      Псалом {psalm.number}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
                        {psalm.text}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="saints" className="animate-fade-in">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
                <Icon name="Users" size={32} />
                Жития святых
              </h2>
              <div className="grid gap-6">
                {saints.map((saint, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-all bg-background/50">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={saint.image}
                          alt={saint.name}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-2xl font-bold text-primary mb-2">{saint.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{saint.dates}</p>
                        <p className="text-base leading-relaxed text-foreground/90">{saint.fullBio}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="animate-fade-in">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
                <Icon name="Calendar" size={32} />
                Православный календарь
              </h2>
              <div className="grid gap-3">
                {calendarEvents.map((event, index) => (
                  <Card
                    key={index}
                    className={`p-4 transition-all hover:shadow-lg ${
                      event.type === 'major' ? 'bg-primary/5 border-primary/30' : 'bg-background/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Icon
                          name={event.type === 'major' ? 'Star' : 'Sparkles'}
                          size={24}
                          className={event.type === 'major' ? 'text-primary' : 'text-secondary'}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-primary text-sm mb-1">{event.date}</p>
                        <h3 className="text-lg font-semibold text-foreground">{event.event}</h3>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rosary" className="animate-fade-in">
            <PrayerRosary />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
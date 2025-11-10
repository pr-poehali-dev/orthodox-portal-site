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
  { number: 1, excerpt: 'Блажен муж, иже не иде на совет нечестивых...' },
  { number: 23, excerpt: 'Господь просвещение мое и Спаситель мой...' },
  { number: 51, excerpt: 'Помилуй мя, Боже, по велицей милости Твоей...' },
  { number: 91, excerpt: 'Живый в помощи Вышняго...' },
  { number: 103, excerpt: 'Благослови, душе моя, Господа...' },
];

const saints = [
  {
    name: 'Преподобный Сергий Радонежский',
    dates: '1314-1392',
    description: 'Основатель Троице-Сергиевой лавры, игумен земли Русской',
  },
  {
    name: 'Святитель Николай Чудотворец',
    dates: '270-345',
    description: 'Архиепископ Мир Ликийских, великий чудотворец',
  },
  {
    name: 'Преподобный Серафим Саровский',
    dates: '1754-1833',
    description: 'Великий подвижник и старец земли Русской',
  },
  {
    name: 'Блаженная Матрона Московская',
    dates: '1881-1952',
    description: 'Слепая прозорливица и чудотворица',
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
              <div className="grid gap-4">
                {psalms.map((psalm) => (
                  <Card key={psalm.number} className="p-4 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-primary mb-2">Псалом {psalm.number}</h3>
                    <p className="text-muted-foreground italic">{psalm.excerpt}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="saints" className="animate-fade-in">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
                <Icon name="Users" size={32} />
                Жития святых
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {saints.map((saint, index) => (
                  <Card key={index} className="p-5 hover:shadow-lg transition-shadow bg-background/50">
                    <h3 className="text-xl font-bold text-primary mb-2">{saint.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{saint.dates}</p>
                    <p className="text-foreground/90">{saint.description}</p>
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

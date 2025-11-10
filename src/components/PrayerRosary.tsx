import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const beadColors = {
  red: '#DC2626',
  yellow: '#EAB308',
  blue: '#2563EB',
  lightblue: '#0EA5E9',
  green: '#16A34A',
  purple: '#9333EA',
  orange: '#EA580C',
  pink: '#EC4899',
};

export default function PrayerRosary() {
  const [count, setCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState<keyof typeof beadColors>('red');
  const [clickedBead, setClickedBead] = useState<number | null>(null);

  const beadCount = 50;
  const radius = 140;
  const centerX = 180;
  const centerY = 180;

  const handleBeadClick = (index: number) => {
    setCount(count + 1);
    setClickedBead(index);
    setTimeout(() => setClickedBead(null), 300);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary mb-2">Четки</h2>
        <p className="text-muted-foreground">Нажимайте на бусины для подсчета молитв</p>
      </div>

      <Card className="p-6 bg-card/80 backdrop-blur">
        <div className="flex flex-col items-center gap-6">
          <div className="relative" style={{ width: '360px', height: '360px' }}>
            <svg width="360" height="360" className="absolute inset-0">
              {Array.from({ length: beadCount }).map((_, index) => {
                const angle = (index * 360) / beadCount - 90;
                const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
                const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
                const isClicked = clickedBead === index;

                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={isClicked ? 10 : 8}
                    fill={beadColors[selectedColor]}
                    className={`cursor-pointer transition-all duration-300 hover:opacity-80 ${
                      isClicked ? 'animate-bead-pulse' : ''
                    }`}
                    onClick={() => handleBeadClick(index)}
                    style={{
                      filter: isClicked ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                    }}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-background/90 rounded-full p-8 shadow-lg">
                <div className="text-5xl font-bold text-primary">{count}</div>
                <div className="text-sm text-muted-foreground mt-1">молитв</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div>
              <p className="text-sm font-semibold mb-2 text-center">Выберите цвет четок:</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {(Object.keys(beadColors) as Array<keyof typeof beadColors>).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === color ? 'border-primary shadow-lg scale-110' : 'border-border'
                    }`}
                    style={{ backgroundColor: beadColors[color] }}
                    aria-label={`Выбрать ${color}`}
                  />
                ))}
              </div>
            </div>

            <Button onClick={resetCount} variant="outline" className="w-full">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Сбросить счетчик
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

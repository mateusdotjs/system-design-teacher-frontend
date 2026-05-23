import { useState, useEffect } from 'react';
import { type Challenge } from './types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Loader2, Check } from 'lucide-react';

interface SidebarLeftProps {
  challenge: Challenge | null;
  isValidating: boolean;
  onValidate: () => void;
}

export function SidebarLeft({ challenge, isValidating, onValidate }: SidebarLeftProps) {
  const [checkedFR, setCheckedFR] = useState<Record<number, boolean>>({});
  const [checkedNFR, setCheckedNFR] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setCheckedFR({});
    setCheckedNFR({});
  }, [challenge?.id]);

  if (!challenge) return null;

  const toggleFR = (index: number) => {
    setCheckedFR((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleNFR = (index: number) => {
    setCheckedNFR((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <aside className="w-80 border-r bg-background flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold tracking-tight">{challenge.title}</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {challenge.description}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Functional Requirements</h3>
            <ul className="space-y-3">
              {challenge.functionalRequirements.map((req, i) => {
                const isChecked = !!checkedFR[i];
                return (
                  <li key={i} className="flex items-start">
                    <label className="flex items-start gap-3 text-sm text-foreground/80 cursor-pointer group select-none w-full">
                      <div className="relative flex items-center justify-center shrink-0 mt-0.5 w-4 h-4 rounded border border-muted-foreground/30 bg-background transition-all duration-200 group-hover:border-primary">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFR(i)}
                          className="sr-only"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center rounded bg-primary text-primary-foreground transition-all duration-200 ${
                            isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>
                      <span
                        className={`transition-all duration-300 ${
                          isChecked ? 'line-through text-muted-foreground/60' : 'text-foreground/80 group-hover:text-foreground'
                        }`}
                      >
                        {req}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Non-Functional Requirements</h3>
            <ul className="space-y-3">
              {challenge.nonFunctionalRequirements.map((req, i) => {
                const isChecked = !!checkedNFR[i];
                return (
                  <li key={i} className="flex items-start">
                    <label className="flex items-start gap-3 text-sm text-foreground/80 cursor-pointer group select-none w-full">
                      <div className="relative flex items-center justify-center shrink-0 mt-0.5 w-4 h-4 rounded border border-muted-foreground/30 bg-background transition-all duration-200 group-hover:border-primary">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleNFR(i)}
                          className="sr-only"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center rounded bg-primary text-primary-foreground transition-all duration-200 ${
                            isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>
                      <span
                        className={`transition-all duration-300 ${
                          isChecked ? 'line-through text-muted-foreground/60' : 'text-foreground/80 group-hover:text-foreground'
                        }`}
                      >
                        {req}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/30">
        <Button 
          className="w-full gap-2 font-bold py-6 shadow-lg shadow-primary/20" 
          onClick={onValidate}
          disabled={isValidating}
        >
          {isValidating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Validating...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Validate Architecture
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

import { useState } from 'react';
import { Play, Square, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TerminalOutput } from '@/types/api';

interface TerminalProps {
  className?: string;
  output?: TerminalOutput[];
  aiSummary?: TerminalOutput[];
}

export function Terminal({ className, output = [], aiSummary = [] }: TerminalProps) {
  const [mode, setMode] = useState<'original' | 'ai'>('original');
  const [command, setCommand] = useState('');

  const displayOutput = mode === 'original' ? output : aiSummary;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend API to execute command
    console.log('Execute command:', command);
    setCommand('');
  };

  return (
    <div className={cn('h-full flex flex-col bg-terminal-bg', className)}>
      {/* Terminal Header */}
      <div className="ide-panel-header">
        <div className="flex items-center gap-4">
          <span className="ide-panel-title">Terminal</span>
          <div className="flex rounded-md overflow-hidden border border-border">
            <button
              onClick={() => setMode('original')}
              className={cn(
                'px-3 py-1 text-xs font-medium transition-colors',
                mode === 'original' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              Original
            </button>
            <button
              onClick={() => setMode('ai')}
              className={cn(
                'px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1',
                mode === 'ai' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              <Sparkles className="h-3 w-3" />
              AI
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Play className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Square className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-auto p-3 font-mono text-sm space-y-1">
        {displayOutput.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            No terminal output yet
          </div>
        ) : (
          displayOutput.map((line) => (
            <div 
              key={line.id} 
              className={cn(
                'terminal-line',
                line.type === 'command' && 'terminal-prompt font-semibold',
                line.type === 'output' && 'terminal-output',
                line.type === 'error' && 'text-destructive',
                line.type === 'ai-summary' && 'text-primary'
              )}
            >
              {line.content}
            </div>
          ))
        )}
      </div>

      {/* Command Input */}
      <form onSubmit={handleSubmit} className="border-t border-border p-2">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-primary">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command..."
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </form>
    </div>
  );
}

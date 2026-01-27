import { useState } from 'react';
import {
  Play,
  Sparkles,
  FileCode,
  Zap,
  Layers,
  Palette,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { TestCase } from '@/types/api';

const actionButtons = [
  { id: '1', label: 'Generate Test Cases', icon: Sparkles },
  { id: '2', label: 'Code Explanation', icon: FileCode },
  { id: '3', label: 'Simulate runs: sub-processes', icon: Zap },
  { id: '4', label: 'Reduce Complexity', icon: Layers },
  { id: '5', label: 'Re-design', icon: Palette },
];

interface TestingPageProps {
  tests?: TestCase[];
}

export default function TestingPage({ tests = [] }: TestingPageProps) {
  const [metrics, setMetrics] = useState({
    efficiency: 0,
    scalability: 0,
  });
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const passedTests = tests.filter(t => t.status === 'passed').length;
  const failedTests = tests.filter(t => t.status === 'failed').length;
  const pendingTests = tests.filter(t => t.status === 'pending').length;

  return (
    <div className="h-full flex">
      {/* Left - Visualization */}
      <div className="flex-1 flex flex-col border-r border-border">
        <div className="ide-panel-header">
          <span className="ide-panel-title">Testing & Visualization</span>
          <Button size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Run All Tests
          </Button>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {/* Test Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-2xl font-bold">{passedTests}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Passed</p>
            </div>
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-2xl font-bold">{failedTests}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Failed</p>
            </div>
            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                <span className="text-2xl font-bold">{pendingTests}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Pending</p>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="h-64 bg-secondary/30 border border-border rounded-lg flex items-center justify-center mb-6">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 text-primary/50" />
              <p>Test Coverage Visualization</p>
              <p className="text-xs">Click "Run All Tests" to generate visualization</p>
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-2">
            <h3 className="font-semibold mb-3">Test Results</h3>
            {tests.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No tests available. Run tests to see results.
              </div>
            ) : (
              tests.map((test) => (
                <div
                  key={test.id}
                  className={cn(
                    'p-3 rounded-lg border flex items-center justify-between',
                    test.status === 'passed' && 'border-success/30 bg-success/5',
                    test.status === 'failed' && 'border-destructive/30 bg-destructive/5',
                    test.status === 'pending' && 'border-border bg-secondary/30'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {test.status === 'passed' && <CheckCircle2 className="h-4 w-4 text-success" />}
                    {test.status === 'failed' && <XCircle className="h-4 w-4 text-destructive" />}
                    {test.status === 'pending' && <Clock className="h-4 w-4 text-muted-foreground" />}
                    <span className="font-medium text-sm">{test.name}</span>
                  </div>
                  {test.duration > 0 && (
                    <span className="text-xs text-muted-foreground">{test.duration}ms</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right - Actions & Metrics */}
      <div className="w-80 bg-card flex flex-col">
        {/* AI Actions */}
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold mb-4">AI Actions</h3>
          <div className="space-y-2">
            {actionButtons.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant={selectedAction === action.id ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => setSelectedAction(action.id)}
                >
                  <Icon className="h-4 w-4" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Metrics */}
        <div className="p-4 flex-1">
          <h3 className="font-semibold mb-4">Performance Metrics</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Efficiency Metric</span>
                <span className="text-primary font-medium">{metrics.efficiency}%</span>
              </div>
              <Slider
                value={[metrics.efficiency]}
                onValueChange={([v]) => setMetrics(m => ({ ...m, efficiency: v }))}
                max={100}
                min={0}
                step={1}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Code execution efficiency score
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Scalability Metric</span>
                <span className="text-primary font-medium">{metrics.scalability}%</span>
              </div>
              <Slider
                value={[metrics.scalability]}
                onValueChange={([v]) => setMetrics(m => ({ ...m, scalability: v }))}
                max={100}
                min={0}
                step={1}
              />
              <p className="text-xs text-muted-foreground mt-1">
                System scalability assessment
              </p>
            </div>
          </div>

          {/* Action Result Area */}
          {selectedAction && (
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">AI Output</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect to backend to process AI actions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

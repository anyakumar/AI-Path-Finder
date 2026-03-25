import { useState, useCallback, useRef, useEffect } from 'react';
import Grid from '@/components/Grid';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  algorithms,
  type AlgorithmKey,
  type CellType,
  type Position,
  type SearchStep,
  type SearchResult,
} from '@/lib/searchAlgorithms';
import { Play, Pause, RotateCcw, SkipForward, Shuffle } from 'lucide-react';

const ROWS = 25;
const COLS = 40;
const DEFAULT_START: Position = { row: 12, col: 5 };
const DEFAULT_END: Position = { row: 12, col: 34 };

type Tool = 'wall' | 'start' | 'end' | 'erase';

function createEmptyGrid(): CellType[][] {
  const g: CellType[][] = Array.from({ length: ROWS }, () => Array(COLS).fill('empty'));
  g[DEFAULT_START.row][DEFAULT_START.col] = 'start';
  g[DEFAULT_END.row][DEFAULT_END.col] = 'end';
  return g;
}

function generateMaze(): CellType[][] {
  const g: CellType[][] = Array.from({ length: ROWS }, () => Array(COLS).fill('empty'));
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (Math.random() < 0.3) g[r][c] = 'wall';
    }
  }
  g[DEFAULT_START.row][DEFAULT_START.col] = 'start';
  g[DEFAULT_END.row][DEFAULT_END.col] = 'end';
  return g;
}

export default function Visualizer() {
  const [grid, setGrid] = useState<CellType[][]>(createEmptyGrid);
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>('bfs');
  const [tool, setTool] = useState<Tool>('wall');
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [stepIndex, setStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStep: SearchStep | null = result && stepIndex >= 0 && stepIndex < result.steps.length
    ? result.steps[stepIndex] : null;

  const findCell = useCallback((type: 'start' | 'end'): Position | null => {
    for (let r = 0; r < grid.length; r++)
      for (let c = 0; c < grid[0].length; c++)
        if (grid[r][c] === type) return { row: r, col: c };
    return null;
  }, [grid]);

  const clearVisualization = useCallback(() => {
    setResult(null);
    setStepIndex(-1);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleCellUpdate = useCallback((row: number, col: number) => {
    clearVisualization();
    setGrid(prev => {
      const next = prev.map(r => [...r]);
      if (tool === 'start') {
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (next[r][c] === 'start') next[r][c] = 'empty';
        next[row][col] = 'start';
      } else if (tool === 'end') {
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (next[r][c] === 'end') next[r][c] = 'empty';
        next[row][col] = 'end';
      } else if (tool === 'erase') {
        if (next[row][col] === 'wall') next[row][col] = 'empty';
      } else {
        if (next[row][col] === 'empty') next[row][col] = 'wall';
      }
      return next;
    });
  }, [tool, clearVisualization]);

  const runAlgorithm = useCallback(() => {
    const start = findCell('start');
    const end = findCell('end');
    if (!start || !end) return;
    clearVisualization();
    const res = algorithms[algorithm].fn(grid, start, end);
    setResult(res);
    setStepIndex(0);
    setIsPlaying(true);
  }, [grid, algorithm, findCell, clearVisualization]);

  useEffect(() => {
    if (isPlaying && result) {
      const delay = Math.max(5, 200 - speed * 2);
      intervalRef.current = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= result.steps.length - 1) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }
  }, [isPlaying, result, speed]);

  const algoInfo = algorithms[algorithm];

  const tools: { key: Tool; label: string }[] = [
    { key: 'wall', label: '🧱 Wall' },
    { key: 'erase', label: '🧹 Erase' },
    { key: 'start', label: '🟢 Start' },
    { key: 'end', label: '🔴 End' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-5 flex items-center justify-between w-full bg-card shadow-lg">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-5xl font-bold font-mono text-primary tracking-tighter drop-shadow-lg">
            PathFinder
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            An interactive AI pathfinding visualizer that brings search algorithms to life on dynamic grids.
          </p>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          Made by: Anya Kumar, Soumya Bhatia and M. Dharni
        </span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-64 border-r border-border p-5 flex flex-col gap-5 overflow-y-auto shrink-0 bg-card shadow-xl">
          {/* Algorithm Selection */}
          <div className="rounded-lg bg-muted/40 p-4 space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Algorithm</label>
            <Select value={algorithm} onValueChange={(v) => { setAlgorithm(v as AlgorithmKey); clearVisualization(); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1 text-xs text-muted-foreground font-mono">Uninformed</div>
                {Object.entries(algorithms).filter(([,a]) => a.type === 'Uninformed').map(([k,a]) => (
                  <SelectItem key={k} value={k}>{a.name}</SelectItem>
                ))}
                <div className="px-2 py-1 text-xs text-muted-foreground font-mono mt-1">Informed</div>
                {Object.entries(algorithms).filter(([,a]) => a.type === 'Informed').map(([k,a]) => (
                  <SelectItem key={k} value={k}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-foreground mt-2 leading-relaxed">{algoInfo.description}</p>
            <span className={`inline-block mt-2 text-[10px] font-mono px-2.5 py-1 rounded-full transition-colors ${algoInfo.type === 'Informed' ? 'bg-accent/30 text-accent font-semibold' : 'bg-primary/30 text-primary font-semibold'}`}>
              {algoInfo.type}
            </span>
          </div>

          {/* Tools */}
          <div className="rounded-lg bg-muted/40 p-4 space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Draw Tool</label>
            <div className="grid grid-cols-2 gap-2">
              {tools.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTool(t.key)}
                  className={`text-xs py-2 px-3 rounded-lg border-2 transition-all font-medium ${
                    tool === t.key
                      ? 'border-primary bg-primary/20 text-primary shadow-lg'
                      : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-muted/60'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Speed */}
          <div className="rounded-lg bg-muted/40 p-4 space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Speed</label>
            <Slider value={[speed]} onValueChange={([v]) => setSpeed(v)} min={1} max={100} step={1} />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <Button onClick={runAlgorithm} className="w-full gap-2 font-semibold py-2 h-auto shadow-lg hover:shadow-xl transition-shadow">
              <Play className="w-4 h-4" /> Visualize
            </Button>
            {result && (
              <Button variant="secondary" onClick={() => setIsPlaying(!isPlaying)} className="w-full gap-2 font-medium py-2 h-auto transition-all">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Resume'}
              </Button>
            )}
            {result && (
              <Button variant="secondary" onClick={() => setStepIndex(result.steps.length - 1)} className="w-full gap-2 font-medium py-2 h-auto transition-all">
                <SkipForward className="w-4 h-4" /> Skip to End
              </Button>
            )}
            <Button variant="outline" onClick={() => { clearVisualization(); setGrid(createEmptyGrid()); }} className="w-full gap-2 font-medium py-2 h-auto transition-all">
              <RotateCcw className="w-4 h-4" /> Clear Grid
            </Button>
            <Button variant="outline" onClick={() => { clearVisualization(); setGrid(generateMaze()); }} className="w-full gap-2 font-medium py-2 h-auto transition-all">
              <Shuffle className="w-4 h-4" /> Random Maze
            </Button>
          </div>

          {/* Stats */}
          {currentStep && (
            <div className="rounded-lg border-2 border-primary/30 bg-primary/10 p-4 space-y-2 shadow-lg">
              <p className="text-xs font-mono text-muted-foreground">Step <span className="font-bold text-secondary">{stepIndex + 1}</span> / <span className="font-bold text-secondary">{result!.steps.length}</span></p>
              <p className="text-xs font-mono">Visited: <span className="text-primary font-bold">{currentStep.visited.length}</span></p>
              {currentStep.done && (
                <>
                  <p className="text-xs font-mono">
                    {currentStep.found
                      ? <>Path: <span className="text-accent font-bold">{currentStep.path.length}</span></>
                      : <span className="text-destructive font-bold text-xs">✗ No path</span>
                    }
                  </p>
                </>
              )}
            </div>
          )}

          {/* Legend */}
          <div className="space-y-2.5 mt-auto rounded-lg bg-muted/40 p-4">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">Legend</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['bg-cell-start', 'Start'],
                ['bg-cell-end', 'End'],
                ['bg-cell-wall', 'Wall'],
                ['bg-cell-visited', 'Visited'],
                ['bg-cell-frontier', 'Frontier'],
                ['bg-cell-path', 'Path'],
              ].map(([color, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-md ${color} shadow-md`} />
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid Area */}
        <main className="flex-1 flex items-center justify-center p-4 overflow-auto">
          <Grid
            grid={grid}
            step={currentStep}
            onCellClick={handleCellUpdate}
            onCellDrag={handleCellUpdate}
            isDrawing={isDrawing}
            onDrawStart={() => setIsDrawing(true)}
            onDrawEnd={() => setIsDrawing(false)}
          />
        </main>
      </div>
    </div>
  );
}

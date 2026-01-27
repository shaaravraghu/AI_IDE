import { useState } from 'react';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileExplorer } from '@/components/developer/FileExplorer';
import { CodeEditor } from '@/components/developer/CodeEditor';
import { Terminal } from '@/components/developer/Terminal';
import { AgentSidePanel } from '@/components/developer/AgentSidePanel';
import { FileNode, OpenFile } from '@/types/api';

export default function DeveloperPage() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [files, setFiles] = useState<FileNode[]>([]);
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'folder') return;
    
    const existing = openFiles.find(f => f.path === file.path);
    if (existing) {
      setActiveFileId(existing.id);
    } else {
      // TODO: Fetch file content from backend API
      const newFile: OpenFile = {
        id: Date.now().toString(),
        name: file.name,
        path: file.path,
        content: '', // Will be loaded from backend
        language: file.language || 'typescript',
        isModified: false,
      };
      setOpenFiles([...openFiles, newFile]);
      setActiveFileId(newFile.id);
    }
    setSelectedPath(file.path);
  };

  const handleFileClose = (fileId: string) => {
    const newFiles = openFiles.filter(f => f.id !== fileId);
    setOpenFiles(newFiles);
    if (activeFileId === fileId) {
      setActiveFileId(newFiles.length > 0 ? newFiles[newFiles.length - 1].id : null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - File Explorer (Collapsible) */}
        <div
          className={cn(
            'relative bg-card border-r border-border transition-all duration-300 overflow-hidden flex flex-col',
            leftPanelOpen ? 'w-56' : 'w-0'
          )}
        >
          <FileExplorer 
            onFileSelect={handleFileSelect} 
            selectedPath={selectedPath}
            files={files}
          />
        </div>
        
        {/* Left Panel Toggle */}
        <button
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          className="w-5 flex items-center justify-center bg-secondary/30 border-r border-border hover:bg-secondary/50 transition-colors"
        >
          {leftPanelOpen ? (
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {/* Center - Code Editor & Terminal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Open Files Header */}
          <div className="h-8 bg-secondary/20 border-b border-border flex items-center px-2">
            <span className="text-xs text-muted-foreground">Open Files</span>
          </div>

          {/* Code Display Window */}
          <div className={cn('flex-1 overflow-hidden', terminalExpanded && 'hidden')}>
            <CodeEditor
              openFiles={openFiles}
              activeFileId={activeFileId}
              onFileClose={handleFileClose}
              onFileSelect={setActiveFileId}
            />
          </div>

          {/* Terminal */}
          <div
            className={cn(
              'border-t border-border transition-all duration-300',
              terminalExpanded ? 'flex-1' : 'h-48'
            )}
          >
            <div className="h-full relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-12 h-6 w-6 z-10"
                onClick={() => setTerminalExpanded(!terminalExpanded)}
              >
                {terminalExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
              </Button>
              <Terminal />
            </div>
          </div>
        </div>

        {/* Right Panel Toggle */}
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="w-5 flex items-center justify-center bg-secondary/30 border-l border-border hover:bg-secondary/50 transition-colors"
        >
          {rightPanelOpen ? (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {/* Right Panel - Current Working Agent */}
        <div
          className={cn(
            'bg-card border-l border-border transition-all duration-300 overflow-hidden',
            rightPanelOpen ? 'w-72' : 'w-0'
          )}
        >
          <AgentSidePanel />
        </div>
      </div>
    </div>
  );
}

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OpenFile } from '@/types/api';

interface CodeEditorProps {
  openFiles: OpenFile[];
  activeFileId: string | null;
  onFileClose: (fileId: string) => void;
  onFileSelect: (fileId: string) => void;
}

export function CodeEditor({ openFiles, activeFileId, onFileClose, onFileSelect }: CodeEditorProps) {
  const activeFile = openFiles.find(f => f.id === activeFileId);

  return (
    <div className="h-full flex flex-col bg-editor-bg">
      {/* Tabs */}
      <div className="flex bg-secondary/30 border-b border-border overflow-x-auto ide-scrollbar-hidden">
        {openFiles.map((file) => (
          <div
            key={file.id}
            className={cn('editor-tab', activeFileId === file.id && 'active')}
            onClick={() => onFileSelect(file.id)}
          >
            <span className="truncate max-w-32">{file.name}</span>
            {file.isModified && <span className="w-2 h-2 rounded-full bg-primary" />}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(file.id);
              }}
              className="p-0.5 hover:bg-muted rounded opacity-60 hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {activeFile ? (
          <pre className="text-foreground/90">
            {activeFile.content.split('\n').map((line, i) => (
              <div key={i} className="flex hover:bg-editor-line">
                <span className="w-12 text-right pr-4 text-muted-foreground select-none">
                  {i + 1}
                </span>
                <code className="flex-1">{highlightSyntax(line)}</code>
              </div>
            ))}
          </pre>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Select a file to view its content</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple syntax highlighting
function highlightSyntax(line: string): React.ReactNode {
  const keywords = ['import', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'async', 'await', 'from', 'interface', 'type'];
  
  let result = line;
  
  // Highlight strings
  result = result.replace(/(["'`])([^"'`]*)\1/g, '<span class="text-syntax-string">$&</span>');
  
  // Highlight keywords
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    result = result.replace(regex, `<span class="text-syntax-keyword">${kw}</span>`);
  });
  
  // Highlight comments
  if (line.trim().startsWith('//')) {
    result = `<span class="text-syntax-comment">${line}</span>`;
  }

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  FileCode,
  Folder,
  FolderOpen,
  FileJson,
  FileType,
  File,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileNode } from '@/types/api';

const getFileIcon = (name: string, isOpen?: boolean) => {
  const ext = name.split('.').pop()?.toLowerCase();
  
  if (ext === 'tsx' || ext === 'ts') return <FileCode className="h-4 w-4 text-syntax-keyword" />;
  if (ext === 'json') return <FileJson className="h-4 w-4 text-syntax-function" />;
  if (ext === 'md') return <FileType className="h-4 w-4 text-syntax-string" />;
  return <File className="h-4 w-4 text-muted-foreground" />;
};

interface FileTreeItemProps {
  node: FileNode;
  depth: number;
  selectedPath: string | null;
  onSelect: (node: FileNode) => void;
}

function FileTreeItem({ node, depth, selectedPath, onSelect }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const isFolder = node.type === 'folder';
  const isSelected = selectedPath === node.path;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelect(node);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={cn(
          'file-tree-item',
          isSelected && 'active'
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isFolder ? (
          <>
            {isOpen ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            {isOpen ? (
              <FolderOpen className="h-4 w-4 text-syntax-function" />
            ) : (
              <Folder className="h-4 w-4 text-syntax-function" />
            )}
          </>
        ) : (
          <>
            <span className="w-3" />
            {getFileIcon(node.name)}
          </>
        )}
        <span className="truncate">{node.name}</span>
      </div>
      
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FileExplorerProps {
  onFileSelect: (file: FileNode) => void;
  selectedPath: string | null;
  files?: FileNode[];
}

export function FileExplorer({ onFileSelect, selectedPath, files = [] }: FileExplorerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="ide-panel-header">
        <span className="ide-panel-title">Files & Folders</span>
      </div>
      <div className="flex-1 overflow-auto py-2">
        {files.length === 0 ? (
          <div className="text-xs text-muted-foreground text-center py-4 px-2">
            No files loaded
          </div>
        ) : (
          files.map((node) => (
            <FileTreeItem
              key={node.id}
              node={node}
              depth={0}
              selectedPath={selectedPath}
              onSelect={onFileSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}

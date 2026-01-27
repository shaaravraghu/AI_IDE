import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, MessageSquare, Send, Bot, CheckCircle, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AgentAction {
  id: string;
  action: string;
  status: 'completed' | 'running' | 'pending';
}

interface AgentSidePanelProps {
  className?: string;
  actions?: AgentAction[];
  isActive?: boolean;
  statusMessage?: string;
}

export function AgentSidePanel({ 
  className, 
  actions = [], 
  isActive = false,
  statusMessage = 'No active agent'
}: AgentSidePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  const handleSendComment = () => {
    if (comment.trim()) {
      // TODO: Connect to backend API to send comment
      console.log('Comment sent:', comment);
      setComment('');
      setShowCommentInput(false);
    }
  };

  const getStatusIcon = (status: AgentAction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3.5 w-3.5 text-green-500" />;
      case 'running':
        return <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />;
      case 'pending':
        return <Clock className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn('h-full flex flex-col bg-card', className)}>
      {/* Header with collapse toggle */}
      <div className="ide-panel-header justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <span className="ide-panel-title">Current Working Agent</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Agent Status */}
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                'w-2 h-2 rounded-full',
                isActive ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'
              )} />
              <span className="text-sm font-medium">
                {isActive ? 'Agent Active' : 'Agent Idle'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {statusMessage}
            </p>
          </div>

          {/* Action Queue */}
          <div className="flex-1 overflow-auto p-3">
            <div className="text-xs text-muted-foreground mb-2">Current Decisions & Queue</div>
            {actions.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-4">
                No actions in queue
              </div>
            ) : (
              <div className="space-y-2">
                {actions.map((action) => (
                  <div
                    key={action.id}
                    className={cn(
                      'flex items-start gap-2 p-2 rounded-md text-xs',
                      action.status === 'running' && 'bg-primary/10 border border-primary/20',
                      action.status === 'completed' && 'bg-secondary/30',
                      action.status === 'pending' && 'bg-secondary/10 text-muted-foreground'
                    )}
                  >
                    {getStatusIcon(action.status)}
                    <span className="flex-1">{action.action}</span>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-3 italic">
              Old messages get saved in the Agent tab.
            </p>
          </div>

          {/* Comment Section */}
          <div className="p-3 border-t border-border space-y-2">
            {!showCommentInput ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => setShowCommentInput(true)}
              >
                <MessageSquare className="h-3.5 w-3.5 mr-2" />
                Raise a comment for the team
              </Button>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your comment for the team..."
                  className="w-full h-16 p-2 bg-secondary/20 border border-border rounded text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setShowCommentInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={handleSendComment}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground text-center">
              Team members can view and modify the code
            </p>
          </div>

          {/* New Action Input */}
          <div className="p-3 border-t border-border">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              <Plus className="h-3.5 w-3.5 mr-2" />
              Start new action with prompt
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

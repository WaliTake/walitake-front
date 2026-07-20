import type { ReactNode } from 'react';
import { PackageSearch, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#F1F8E9] flex items-center justify-center mb-5">
        {icon ?? <PackageSearch className="text-[#81C784]" size={36} />}
      </div>
      <h3 className="text-xl font-bold text-[#212121] mb-2">{title}</h3>
      {description && (
        <p className="text-[#616161] text-sm max-w-xs leading-relaxed mb-6">{description}</p>
      )}
      {actionLabel && (
        <div>
          {actionHref ? (
            <a href={actionHref}>
              <Button
                variant="primary"
                icon={<RefreshCcw size={16} />}
              >
                {actionLabel}
              </Button>
            </a>
          ) : (
            <Button
              variant="primary"
              icon={<RefreshCcw size={16} />}
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

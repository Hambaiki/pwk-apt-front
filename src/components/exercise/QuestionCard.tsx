import { ReactNode } from "react";

import { Card } from "@/components/ui";

interface QuestionCardProps {
  title: string;
  subtitle?: string;
  progress?: number; // 0–1 (fraction)
  progressLabel?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const QuestionCard = ({
  title,
  subtitle,
  progress,
  progressLabel,
  children,
  footer,
}: QuestionCardProps) => {
  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="bg-brand-500 text-white p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h4 className="text-white text-lg font-semibold">{title}</h4>
          {progressLabel && (
            <div className="bg-brand-600 px-3 py-1 rounded text-sm">
              {progressLabel}
            </div>
          )}
        </div>
        {progress !== undefined && (
          <div className="bg-brand-400 h-2 rounded-full mt-3">
            <div
              className="bg-white h-full rounded-full transition-all ease-in-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
        {subtitle && (
          <p className="text-sm mt-2 text-brand-100">{subtitle}</p>
        )}
      </div>

      {/* Question Content */}
      {children}

      {/* Footer Actions */}
      {footer && <div className="flex gap-3">{footer}</div>}
    </Card>
  );
};

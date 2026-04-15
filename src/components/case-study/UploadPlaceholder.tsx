import { Upload, ImageIcon } from 'lucide-react';

interface UploadPlaceholderProps {
  label: string;
  instructions: string;
  aspectRatio?: string;
}

export const UploadPlaceholder = ({ label, instructions, aspectRatio = 'aspect-video' }: UploadPlaceholderProps) => {
  return (
    <div
      className={`${aspectRatio} w-full rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-4 p-8 text-center transition-colors hover:border-accent/50 hover:bg-muted/50 cursor-pointer`}
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
        <ImageIcon className="w-8 h-8 text-accent" />
      </div>
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground mt-1">{instructions}</p>
      </div>
      <button className="btn-ghost text-sm">
        <Upload size={16} />
        Upload Screenshot
      </button>
    </div>
  );
};

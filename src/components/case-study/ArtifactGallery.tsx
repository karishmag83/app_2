import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface Artifact {
  id: string;
  title: string;
  image: string;
  caption: string;
  validation: string;
}

interface ArtifactGalleryProps {
  artifacts: Artifact[];
}

export const ArtifactGallery = ({ artifacts }: ArtifactGalleryProps) => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artifacts.map((artifact) => (
          <button
            key={artifact.id}
            onClick={() => setSelectedArtifact(artifact)}
            className="artifact-card text-left group"
          >
            <div className="relative aspect-video overflow-hidden bg-white">
              <img
                src={artifact.image}
                alt={artifact.title}
                className="w-full h-full object-contain transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={artifact.image}
                  alt={`${artifact.title} thumbnail`}
                  className="w-14 h-14 rounded-md object-contain bg-white border border-border/60 flex-shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">{artifact.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{artifact.caption}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Zoom overlay */}
      {selectedArtifact && (
        <div
          className="image-zoom-overlay animate-fade-in"
          onClick={() => setSelectedArtifact(null)}
        >
          <div
            className="max-w-5xl w-full bg-background rounded-2xl overflow-hidden shadow-elevated-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedArtifact.image}
                alt={selectedArtifact.title}
                className="w-full max-h-[70vh] object-contain bg-muted"
              />
              <button
                onClick={() => setSelectedArtifact(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">{selectedArtifact.title}</h3>
              <p className="text-muted-foreground">{selectedArtifact.caption}</p>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  What this validated
                </span>
                <p className="text-sm text-foreground mt-1">{selectedArtifact.validation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

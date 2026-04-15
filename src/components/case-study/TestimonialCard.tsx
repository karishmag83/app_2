interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
  tone?: 'dark' | 'light';
}

export const TestimonialCard = ({
  quote,
  author,
  role,
  image,
  tone = 'dark',
}: TestimonialCardProps) => {
  const isLight = tone === 'light';

  return (
    <div className={`testimonial-card${isLight ? ' light' : ''}`}>
      <div className="relative z-10 space-y-6">
        <p className={`text-lg md:text-xl leading-relaxed font-light italic ${isLight ? 'text-foreground' : 'text-white/95'}`}>
          "{quote}"
        </p>
        <div className="flex items-center gap-4">
          {image && (
            <img
              src={image}
              alt={author}
              className={`w-14 h-14 rounded-full object-cover border-2 ${isLight ? 'border-border' : 'border-white/20'}`}
            />
          )}
          <div>
            <div className={`font-semibold ${isLight ? 'text-foreground' : 'text-white'}`}>{author}</div>
            <div className={`text-sm ${isLight ? 'text-muted-foreground' : 'text-white/70'}`}>{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

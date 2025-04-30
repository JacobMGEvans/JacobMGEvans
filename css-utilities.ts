// CSS Utility Functions
// ---------------------

export const sectionContainer = (extraClasses = '') =>
  `max-w-3xl mx-auto my-16 p-10 rounded-xl shadow-xl flex flex-col items-center bg-gradient-to-br from-wolf-dark/90 via-forest-dark/80 to-cyber-blue/30 border border-cyber-pink/40 backdrop-blur-lg animate-fade-in ${extraClasses}`;

export const heading = (
  level: 'h1' | 'h2' | 'h3' | 'h4',
  extraClasses = ''
) => {
  const baseClasses = 'font-heading cyberpunk-heading';

  if (level === 'h1')
    return `${baseClasses} text-5xl md:text-6xl font-bold text-white cyber-glitch ${extraClasses}`;
  if (level === 'h2')
    return `${baseClasses} text-4xl font-extrabold text-mountain-purple mb-8 text-center drop-shadow-glow ${extraClasses}`;
  if (level === 'h3')
    return `${baseClasses} text-xl font-semibold mb-4 text-mountain-blue ${extraClasses}`;
  if (level === 'h4')
    return `${baseClasses} text-lg font-semibold mb-2 text-mountain-blue ${extraClasses}`;

  return baseClasses;
};

export const paragraph = (variation = 'default') => {
  if (variation === 'default') return 'text-gray-300 mb-4';
  if (variation === 'light') return 'text-gray-200 text-center mb-6 max-w-2xl';
  if (variation === 'small') return 'text-sm text-gray-400 mt-2';
  if (variation === 'cyber')
    return 'text-gray-300 mb-4 font-sans tracking-wide';

  return 'text-gray-300';
};

export const list = () => 'list-disc list-inside text-gray-300 space-y-2';

export const link = (variation = 'default') => {
  const baseClasses =
    'text-mountain-blue hover:text-cyber-pink transition-colors duration-300';

  if (variation === 'default') return baseClasses;
  if (variation === 'nav') return `${baseClasses} nav-link font-medium`;
  if (variation === 'underline')
    return `${baseClasses} hover:underline font-medium`;
  if (variation === 'cyber')
    return `${baseClasses} relative overflow-hidden px-2 py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-mountain-blue before:to-cyber-pink before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`;

  return baseClasses;
};

export const imageContainer = (isRightColumn = false) => {
  const baseClasses =
    'relative h-64 rounded-md overflow-hidden shadow-md border border-cyber-blue/30 glow-animate';
  return isRightColumn ? `${baseClasses} order-2 md:order-1` : baseClasses;
};

export const responsiveImage = () =>
  'absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-110 filter saturate-[1.2] contrast-[1.1]';

export const grid = (columns = 2) =>
  `grid grid-cols-1 md:grid-cols-${columns} gap-8`;

export const socialIcon = () => 'hover:text-cyber-pink transition-colors';

export const badge = () =>
  'tech-badge px-4 py-2 rounded-sm text-sm font-medium';

export const flex = (direction = 'row', extraClasses = '') => {
  const baseClasses = direction === 'row' ? 'flex' : 'flex flex-col';
  return `${baseClasses} ${extraClasses}`;
};

export const gradientHeader = () =>
  'bg-gradient-to-r from-forest-dark via-wolf-dark to-forest-dark border-b border-cyber-blue/30';

export const ossPreviewImage = () =>
  'rounded-lg shadow-lg glow-animate object-cover w-[125px] h-[120px]';

export const previewContainer = () =>
  'inline-block p-2 transition-transform duration-300 hover:scale-110';

export const footerStyle = () =>
  `w-full p-8 ${gradientHeader()} text-gray-100 relative overflow-hidden`;

export const cyberButton = (size = 'medium') => {
  const baseClasses =
    'relative overflow-hidden font-heading tracking-wider text-center inline-block transition-all duration-300 uppercase';

  let sizeClasses = 'px-6 py-2 text-sm';
  if (size === 'small') sizeClasses = 'px-4 py-1 text-xs';
  if (size === 'large') sizeClasses = 'px-8 py-3 text-base';

  return `${baseClasses} ${sizeClasses} bg-gradient-to-r from-mountain-blue to-cyber-pink text-white border border-transparent hover:from-cyber-pink hover:to-mountain-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.7)] transform hover:-translate-y-1`;
};

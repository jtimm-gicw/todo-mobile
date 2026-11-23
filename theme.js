// STEP 1: Keep all colors in one place, like reusable CSS variables on the web.
// STEP 2: App chooses one palette and passes it to each child component.
export const themes = {
  light: {
    background: '#F1F5F9', card: '#FFFFFF', text: '#0F172A', muted: '#475569',
    accent: '#1D4ED8', accentText: '#FFFFFF', border: '#CBD5E1',
    soft: '#DBEAFE', softText: '#1E3A8A', selected: '#FEF3C7',
    selectedBorder: '#B45309', danger: '#B91C1C', nav: '#FFFFFF',
    status: 'dark-content', placeholder: '#64748B', success: '#166534',
  },
  dark: {
    background: '#0B1220', card: '#1E293B', text: '#F8FAFC', muted: '#CBD5E1',
    accent: '#93C5FD', accentText: '#0B1220', border: '#475569',
    soft: '#172B49', softText: '#DBEAFE', selected: '#493414',
    selectedBorder: '#FBBF24', danger: '#FCA5A5', nav: '#162236',
    status: 'light-content', placeholder: '#CBD5E1', success: '#86EFAC',
  },
};

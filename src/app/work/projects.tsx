const slugifyTitle = (title: string): string => {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\[\](){}]/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$|\.+$/g, '')
    .toLowerCase();
};

const buildSrc = (title: string, index?: number, ext: 'jpg' | 'mp4' = 'jpg'): string => {
  const base = slugifyTitle(title);
  const name = typeof index === 'number' ? `${base}-${index}` : base;
  return `/images/${name}.${ext}`;
};

export const slides = [
    {
      main: { src: buildSrc("RAR [Visual identity]", 1), title: "RAR [Visual identity]", isPortrait: false },
      other: [
        { src: buildSrc("RAR [Visual identity]", 2), title: "RAR [Visual identity]", isPortrait: false },
        { src: buildSrc("RAR [Visual identity]", 3), title: "RAR [Visual identity]", isPortrait: false },
      ],
    },
    {
      main: { src: buildSrc("MONTBÉLIARD", 1), title: "CHÂTEAU-MUSÉE DE MONTBÉLIARD x Designers Unit [Exhibition Design]", isPortrait: true },
      other: [
        { src: buildSrc("MONTBÉLIARD", 2), title: "CHÂTEAU-MUSÉE DE MONTBÉLIARD x Designers Unit [Exhibition Design]", isPortrait: true },
        { src: buildSrc("MONTBÉLIARD", 3), title: "CHÂTEAU-MUSÉE DE MONTBÉLIARD x Designers Unit [Exhibition Design]", isPortrait: true },
        { src: buildSrc("MONTBÉLIARD", 4), title: "CHÂTEAU-MUSÉE DE MONTBÉLIARD x Designers Unit [Exhibition Design]", isPortrait: true },
        { src: buildSrc("MONTBÉLIARD", 5), title: "CHÂTEAU-MUSÉE DE MONTBÉLIARD x Designers Unit [Exhibition Design]", isPortrait: true },
      ],
    },
    {
      main: { src: buildSrc("TOURAINE'S TYPOGRAPHIC HERITAGE [Editorial Design]", 1), title: "TOURAINE’S TYPOGRAPHIC HERITAGE [Editorial Design]", isPortrait: false },
      other: [
        { src: buildSrc("TOURAINE'S TYPOGRAPHIC HERITAGE [Editorial Design]", 2), title: "TOURAINE’S TYPOGRAPHIC HERITAGE [Editorial Design]", isPortrait: false },
        { src: buildSrc("TOURAINE'S TYPOGRAPHIC HERITAGE [Editorial Design]", 3), title: "TOURAINE’S TYPOGRAPHIC HERITAGE [Editorial Design]", isPortrait: false },
        { src: buildSrc("TOURAINE'S TYPOGRAPHIC HERITAGE [Editorial Design]", 4), title: "TOURAINE’S TYPOGRAPHIC HERITAGE [Editorial Design]", isPortrait: false },
        { src: buildSrc("TOURAINE'S TYPOGRAPHIC HERITAGE [Editorial Design]", 5), title: "TOURAINE’S TYPOGRAPHIC HERITAGE [Editorial Design]" , isPortrait: false},
      ],
    },
    {
      main: { src: buildSrc("RÉFLÉCHIR L'INSTANT [Exhibition Design]"), title: "RÉFLÉCHIR L’INSTANT [Exhibition Design]", isPortrait: false },
      other: [],
    },
    {
      main: { src: buildSrc("QUEL A.PLOMB  [Editorial design & research paper]", 1), title: "QUEL A.PLOMB  [Editorial design & research paper]", isPortrait: false },
      other: [
        { src: buildSrc("QUEL A.PLOMB  [Editorial design & research paper]", 2), title: "QUEL A.PLOMB  [Editorial design & research paper]", isPortrait: false },
        { src: buildSrc("QUEL A.PLOMB  [Editorial design & research paper]", 3), title: "QUEL A.PLOMB  [Editorial design & research paper]", isPortrait: false },
        { src: buildSrc("QUEL A.PLOMB  [Editorial design & research paper]", 4), title: "QUEL A.PLOMB  [Editorial design & research paper]", isPortrait: false },
      ],
    },
    {
      main: { src: buildSrc("PLATEAU N°8 [Editorial Design]", 2), title: "PLATEAU N°8 [Editorial Design]", isPortrait: false  },
      other: [
        { src: buildSrc("PLATEAU N°8 [Editorial Design]", 1), title: "PLATEAU N°8 [Editorial Design]", isPortrait: true},
        { src: buildSrc("PLATEAU N°8 [Editorial Design]", 3), title: "PLATEAU N°8 [Editorial Design]", isPortrait: false },
        { src: buildSrc("PLATEAU N°8 [Editorial Design]", 4), title: "PLATEAU N°8 [Editorial Design]", isPortrait: false },
      ],
    },
    {
      main: { src: buildSrc("PIXEL CALLIGRAPHY [Digital Tools]", undefined, 'mp4'), title: "PIXEL CALLIGRAPHY [Digital Tools]", isPortrait: false },
      other: [],
    },
    {
      main: { src: buildSrc("MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", 2), title: "MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", isPortrait: true},
      other: [
        { src: buildSrc("MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", 1), title: "MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", isPortrait: true },
        { src: buildSrc("MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", 3), title: "MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", isPortrait: true },
        { src: buildSrc("MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", 4), title: "MUDO — MUSÉE DE L'OISE x Designers Unit [Exhibition Design]", isPortrait: false },
      ],
    },
    {
      main: { src: buildSrc("LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", 1), title: "LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", isPortrait: false },
      other: [
        { src: buildSrc("LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", 2), title: "LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", isPortrait: false },
        { src: buildSrc("LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", 3), title: "LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", isPortrait: false },
        { src: buildSrc("LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", 4), title: "LETTRINES TOURANGELLES WORKSHOP [Mediation Tools]", isPortrait: false },
      ],
    },
    {
      main: { src: buildSrc("LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", 2), title: "LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", isPortrait: false },
      other: [
        { src: buildSrc("LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", 1), title: "LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", isPortrait: false },
        { src: buildSrc("LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", 3), title: "LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", isPortrait: false },
        { src: buildSrc("LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", 4), title: "LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", isPortrait: false },
        { src: buildSrc("LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", 5), title: "LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", isPortrait: false },
        { src: buildSrc("LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", 6), title: "LETTERPRESS WORKSHOP-MUSEUM [Visual Identity]", isPortrait: false },
      ],
    },
    {
      main: { src: buildSrc("LA TOURANGELLE (Type Design)"), title: "LA TOURANGELLE [Type Design]", isPortrait: true},
      other: [
        { src: buildSrc("LA TOURANGELLE (Type Design)", 2), title: "LA TOURANGELLE [Type Design]", isPortrait: false },
        { src: buildSrc("LA TOURANGELLE (Type Design)", 3), title: "LA TOURANGELLE [Type Design]", isPortrait: false },
      ],
    },
    {
      main: { src: buildSrc("BLUE FLOWERS [Visual Expression]", 1), title: "BLUE FLOWERS [Visual Expression]", isPortrait: true },
      other: [
        { src: buildSrc("BLUE FLOWERS [Visual Expression]", 2), title: "BLUE FLOWERS [Visual Expression]", isPortrait: true },
        { src: buildSrc("BLUE FLOWERS [Visual Expression]", 3), title: "BLUE FLOWERS [Visual Expression]", isPortrait: true },
      ],
    },
  ];
  
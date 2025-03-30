export const classes = (..._classes: (string | undefined | null | false)[]) =>
    _classes.flat().filter(Boolean).join(' ');
  
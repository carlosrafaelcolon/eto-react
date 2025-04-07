### Notes on AppWrapper (`src/eto-components/AppWrapper.tsx`)

- I updated the effect to include an empty dependency array (`[]`) and added a cleanup function with `removeEventListener` to ensure only one listener is attached and properly cleaned up on unmount.
- This prevents potential memory leaks from accumulating listeners on re-render. For example, the [AGORA site](https://agora.eto.tech) appends 8 resize listeners on initial load, which continue stacking as users switch tabs.
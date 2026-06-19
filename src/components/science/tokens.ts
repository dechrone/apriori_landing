/* Single source for the /science hub's gold accent. Backed by the
   `--accent-amber` CSS custom property (src/app/globals.css `.landing-dark`,
   = #F5D76E). All science content renders inside the `.landing-dark` scope, so
   `var()` resolves there. Prefer this + the other landing-dark tokens
   (var(--bg-secondary), var(--border-subtle), var(--text-secondary), …) over
   inline hex — see CLAUDE.md. Lives in its own module so both server and client
   components can import it without pulling in component code. */
export const GOLD = "var(--accent-amber)";

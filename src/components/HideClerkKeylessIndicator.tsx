"use client";

import { useEffect } from "react";

/**
 * Hides the Clerk "keyless mode" indicator that appears in the bottom-right corner.
 * Uses a MutationObserver to find and hide the element when it's added to the DOM.
 */
export function HideClerkKeylessIndicator() {
  useEffect(() => {
    const hideKeylessIndicator = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        null,
        false
      );
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (
            el.textContent?.includes("keyless mode") ||
            el.textContent?.includes("Clerk is in keyless")
          ) {
            let target: HTMLElement = el;
            let current: HTMLElement | null = el;
            while (current?.parentElement && current.parentElement !== document.body) {
              current = current.parentElement;
              const style = getComputedStyle(current);
              if (style.position === "fixed" || style.position === "sticky") {
                target = current;
              }
            }
            target.style.setProperty("display", "none", "important");
            return;
          }
        }
      }
    };

    hideKeylessIndicator();

    const observer = new MutationObserver(() => {
      hideKeylessIndicator();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

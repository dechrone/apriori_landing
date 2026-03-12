"use client";

import { useEffect } from "react";

/**
 * Hides the Clerk "keyless mode" indicator that appears in the bottom-right corner.
 * Uses a MutationObserver to find and hide the element when it's added to the DOM.
 */
export function HideClerkKeylessIndicator() {
  useEffect(() => {
    const CLERK_WIDGET_PHRASES = [
      "keyless mode",
      "Clerk is in keyless",
      "Configure your application",
      "Temporary API keys are enabled",
    ];

    const hideKeylessIndicator = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        null
      );
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          const text = el.textContent ?? "";
          if (CLERK_WIDGET_PHRASES.some((phrase) => text.includes(phrase))) {
            // Walk up to find the outermost fixed/absolute ancestor to nuke
            let target: HTMLElement = el;
            let current: HTMLElement | null = el;
            while (current?.parentElement && current.parentElement !== document.body) {
              current = current.parentElement;
              const style = getComputedStyle(current);
              if (
                style.position === "fixed" ||
                style.position === "sticky" ||
                style.position === "absolute"
              ) {
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

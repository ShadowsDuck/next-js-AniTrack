"use client";

import { useEffect } from "react";

export function useFixedTitle(title: string) {
  useEffect(() => {
    // Set initial title
    document.title = title;

    // Create a MutationObserver to watch for title changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "childList" &&
          mutation.target.nodeName === "TITLE"
        ) {
          if (document.title !== title) {
            document.title = title;
          }
        }
      });
    });

    // Watch for changes to the title element
    const titleElement = document.querySelector("title");
    if (titleElement) {
      observer.observe(titleElement.parentNode!, {
        childList: true,
        subtree: true,
      });
    }

    // Also watch for direct property changes
    // const originalTitle = document.title;
    const titleDescriptor = Object.getOwnPropertyDescriptor(
      Document.prototype,
      "title",
    );

    Object.defineProperty(document, "title", {
      get() {
        return titleDescriptor?.get?.call(this) || title;
      },
      set(newTitle) {
        if (newTitle !== title) {
          titleDescriptor?.set?.call(this, title);
        } else {
          titleDescriptor?.set?.call(this, newTitle);
        }
      },
      configurable: true,
    });

    return () => {
      observer.disconnect();
      // Restore original title descriptor
      if (titleDescriptor) {
        Object.defineProperty(document, "title", titleDescriptor);
      }
    };
  }, [title]);
}

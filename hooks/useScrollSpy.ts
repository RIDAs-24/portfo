'use client';

import { useState, useEffect } from 'react';

/**
 * useScrollSpy — tracks which section is currently visible in the viewport.
 *
 * Uses IntersectionObserver (not scroll events) for maximum performance.
 * Returns the id string of the section with the largest visible area,
 * or the last section that crossed the 20% threshold if none are currently
 * above it (prevents flicker when scrolling between sections).
 *
 * @param sectionIds  Array of element IDs to observe (in DOM order).
 * @param rootMargin  IntersectionObserver rootMargin. Negative top offset
 *                    accounts for the fixed header height.
 */
export function useScrollSpy(
  sectionIds: string[],
  rootMargin = '-80px 0px -60% 0px'
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    // Map to track which sections are currently intersecting
    const intersectingMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingMap.set(entry.target.id, entry.intersectionRatio);
          } else {
            intersectingMap.delete(entry.target.id);
          }
        });

        if (intersectingMap.size > 0) {
          // Pick the section with the highest intersection ratio
          let bestId = '';
          let bestRatio = -1;
          intersectingMap.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          });
          if (bestId) setActiveId(bestId);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}

import { useEffect, useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useScrollFadeIn(
  ref: RefObject<HTMLElement | null>,
  options: {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    trigger?: string | HTMLElement;
  } = {}
) {
  useEffect(() => {
    if (!ref.current) return;

    const { direction = 'up', delay = 0, duration = 1.2, trigger } = options;

    let x = 0;
    let y = 0;
    if (direction === 'up') y = 50;
    else if (direction === 'down') y = -50;
    else if (direction === 'left') x = 50;
    else if (direction === 'right') x = -50;

    const anim = gsap.fromTo(
      ref.current,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trigger || ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [ref, options.direction, options.delay, options.duration, options.trigger]);
}

export function useImmersionAnimation(
  containerRef: RefObject<HTMLElement | null>,
  panelsRef: RefObject<HTMLDivElement[] | null>
) {
  useLayoutEffect(() => {
    if (!containerRef.current || !panelsRef.current) return;

    const panels = panelsRef.current;
    if (panels.length === 0) return;

    const totalPanels = panels.length;
    const stepDuration = 2; // Each panel stage gets an identical timeline slice

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalPanels * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Initial setup for all panels
    panels.forEach((panel, index) => {
      const bg = panel.querySelector('.immersion-bg');
      const content = panel.querySelector('.immersion-text');
      gsap.set(panel, { opacity: index === 0 ? 1 : 0, zIndex: 10 + index });
      gsap.set(bg, { scale: 1 });
      gsap.set(content, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 50 });
    });

    // Build timeline with uniform timing across all stages
    panels.forEach((panel, index) => {
      const bg = panel.querySelector('.immersion-bg');
      const content = panel.querySelector('.immersion-text');
      const startTime = index * stepDuration;

      // 1. Continuous smooth background zoom over the panel's active stage
      tl.to(bg, { scale: 1.15, duration: stepDuration, ease: 'none' }, startTime);

      // 2. Transition out text before advancing to next panel
      if (index < totalPanels - 1) {
        tl.to(content, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, startTime + stepDuration - 0.6);
      }

      // 3. Transition in new panel and text at start of stage
      if (index > 0) {
        tl.to(panel, { opacity: 1, duration: 0.8, ease: 'power2.out' }, startTime)
          .to(content, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, startTime + 0.2);
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, [containerRef, panelsRef]);
}

export function useCounterAnimation(
  elementRef: RefObject<HTMLElement | null>,
  targetValue: number,
  duration: number = 2
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const obj = { value: 0 };
    const el = elementRef.current;

    const anim = gsap.to(obj, {
      value: targetValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.innerText = Math.floor(obj.value).toString();
      },
    });

    return () => {
      anim.kill();
    };
  }, [elementRef, targetValue, duration]);
}

import { cubicOut } from 'svelte/easing';

export function materialFade(node, { delay = 0, duration = 400, easing: easing$1 = cubicOut, start = 0.6, opacity = 0 }) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  const isBottom = (window.innerHeight - node.getBoundingClientRect().bottom < 100);
  const isRight = (window.innerWidth - node.getBoundingClientRect().right < 100);
  if (!isBottom && !isRight) {
    node.style.transformOrigin = "left top";
  }
  if (isBottom && !isRight) {
    node.style.top = "auto";
    node.style.bottom = "30px";
    node.style.transformOrigin = "left bottom";
  }
  if (isRight && !isBottom) {
    node.style.left = "auto";
    node.style.right = "0px";
    node.style.transformOrigin = "right top";
  }
  if (isBottom && isRight) {
    node.style.top = "auto";
    node.style.bottom = "30px";
    node.style.left = "auto";
    node.style.right = "0px";
    node.style.transformOrigin = "right bottom";
  }
  return {
    delay,
    duration,
    easing: easing$1,
    css: (_t, u) => `
      transform: ${transform} scale(${1 - (sd * u)});
      opacity: ${target_opacity - (od * u)}`
  };
}
export default {
  bind(el) {
    el.__AutoResizer__ = () => {
      setTimeout(() => {
        el.style.cssText = 'height: auto';
        el.style.cssText = `height: ${el.scrollHeight}px`;
      }, 0);
    };
    el.addEventListener('keydown', el.__AutoResizer__);
  },
  unbind(el) {
    el.removeEventListener('keydown', el.__AutoResizer__);
  },
};

import { useEffect } from 'react';

const useFavIcon = () => {
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as any;

      ctx.lineWidth = 3;
      const r = 8 - ctx.lineWidth;
      ctx.strokeStyle = '#d9503f';
      ctx.beginPath();
      ctx.arc(8, 8, r, Math.PI * 1.1, Math.PI * 1.8);
      ctx.stroke();
      ctx.strokeStyle = '#f2bd42';
      ctx.beginPath();
      ctx.arc(8, 8, r, Math.PI * 0.8, Math.PI * 1.1);
      ctx.stroke();
      ctx.strokeStyle = '#58a55c';
      ctx.beginPath();
      ctx.arc(8, 8, r, Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();
      ctx.strokeStyle = '#5086ec';
      ctx.beginPath();
      ctx.arc(8, 8, r, 0, Math.PI * 0.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8, 8);
      ctx.lineTo(14, 8);
      ctx.stroke();

      let favicon = document.querySelector<HTMLLinkElement>('link[rel=icon]');
      if (favicon === null) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
      }
      favicon.href = canvas.toDataURL('image/png');
      canvas.remove();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return {};
};

export default useFavIcon;

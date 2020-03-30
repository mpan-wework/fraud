import { useCallback, useMemo } from 'react';
import useCanvasFavIcon from '../../util/useCanvasFavIcon';

const iconSize = 16;

const useFavIcon = () => {
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 3;
    const halfSize = iconSize * 0.5;
    const r = halfSize - ctx.lineWidth;
    ctx.strokeStyle = '#d9503f';
    ctx.beginPath();
    ctx.arc(halfSize, halfSize, r, Math.PI * 1.1, Math.PI * 1.8);
    ctx.stroke();
    ctx.strokeStyle = '#f2bd42';
    ctx.beginPath();
    ctx.arc(halfSize, halfSize, r, Math.PI * 0.8, Math.PI * 1.1);
    ctx.stroke();
    ctx.strokeStyle = '#58a55c';
    ctx.beginPath();
    ctx.arc(halfSize, halfSize, r, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();
    ctx.strokeStyle = '#5086ec';
    ctx.beginPath();
    ctx.arc(halfSize, halfSize, r, 0, Math.PI * 0.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(halfSize, halfSize);
    ctx.lineTo(14, halfSize);
    ctx.stroke();
  }, []);
  const props = useMemo(() => ({ width: iconSize, height: iconSize, draw }), [
    draw,
  ]);

  useCanvasFavIcon(props);
  return {};
};

export default useFavIcon;

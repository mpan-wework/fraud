import React, { useCallback, useEffect, useRef, useState } from 'react';
import PointIcon from './PointIcon';
import { MODE } from './AssistiveTouch';

interface Props {
  mode: MODE;
  onClick: Function;
}

const initialStyleState = {
  width: 50,
  height: 50,
  top: 0,
  left: 0,
};

const findPositionOnBorder = (
  left: number,
  top: number,
  width: number,
  height: number
) => {
  const right = width - left;
  const bottom = height - top;
  let newLeft = 0;
  let newTop = 0;

  if (left < right) {
    if (top < bottom) {
      if (left < top) {
        newLeft = 0;
        newTop = top;
      } else {
        newLeft = left;
        newTop = 0;
      }
    } else {
      if (left < bottom) {
        newLeft = 0;
        newTop = top;
      } else {
        newLeft = left;
        newTop = height;
      }
    }
  } else {
    if (top < bottom) {
      if (top < right) {
        newLeft = left;
        newTop = 0;
      } else {
        newLeft = width;
        newTop = top;
      }
    } else {
      if (bottom < right) {
        newLeft = left;
        newTop = height;
      } else {
        newLeft = width;
        newTop = top;
      }
    }
  }

  return { top: newTop, left: newLeft };
};

const Point = (props: Props) => {
  const { mode, onClick } = props;

  const [startMoving, setStartMoving] = useState(false);
  const [moving, setMoving] = useState(false);
  const [styleState, setStyleState] = useState(() => initialStyleState);
  const elRef = useRef<Node>(null);

  const canMovePoint = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (mode !== MODE.POINT) {
        return false;
      }

      const el: Node = elRef.current as any;
      if (!el.contains(event.target as Node)) {
        return false;
      }

      return true;
    },
    [mode, elRef]
  );

  const stickToBorder = useCallback(() => {
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;
    setStyleState((state) => {
      const { left, top } = findPositionOnBorder(
        state.left,
        state.top,
        clientWidth - state.width,
        clientHeight - state.height
      );

      return {
        ...state,
        left: Math.max(
          state.width * 0.5,
          Math.min(clientWidth - state.width * 1.5, left)
        ),
        top: Math.max(
          state.height * 0.5,
          Math.min(clientHeight - state.height * 1.5, top)
        ),
      };
    });
  }, [setStyleState]);

  const mouseup = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      if (startMoving) {
        setStartMoving(false);
        setTimeout(() => {
          onClick();
        }, 0);
      } else if (moving) {
        setTimeout(() => {
          setMoving(false);
          stickToBorder();
        }, 0);
      }
    },
    [startMoving, setStartMoving, onClick, moving, setMoving, stickToBorder]
  );

  const mousemove = useCallback(
    (event: MouseEvent) => {
      if (!moving && !startMoving) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      if (startMoving) {
        setMoving(true);
        setStartMoving(false);
      }

      setStyleState((state) => ({
        ...state,
        top: Math.min(
          document.body.clientHeight,
          Math.max(0, event.clientY - state.height / 2)
        ),
        left: Math.min(
          document.body.clientWidth,
          Math.max(0, event.clientX - state.width / 2)
        ),
      }));
    },
    [moving, startMoving, setMoving, setStartMoving, setStyleState]
  );

  const mousedown = useCallback(
    (event: MouseEvent) => {
      if (!canMovePoint(event)) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      setStartMoving(true);
    },
    [canMovePoint, setStartMoving]
  );

  const touchstart = useCallback(
    (event: TouchEvent) => {
      if (!canMovePoint(event)) {
        return;
      }

      event.stopPropagation();
    },
    [canMovePoint]
  );

  const touchmove = useCallback(
    (event: TouchEvent) => {
      if (!canMovePoint(event)) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      setStyleState((state) => {
        const top = Math.min(
          document.body.clientHeight,
          Math.max(0, event.touches[0].clientY - state.height / 2)
        );

        const left = Math.min(
          document.body.clientWidth,
          Math.max(0, event.touches[0].clientX - state.width / 2)
        );

        return { ...state, top, left };
      });
    },
    [canMovePoint, setStyleState]
  );

  const touchend = useCallback(
    (event: TouchEvent) => {
      if (!canMovePoint(event)) {
        return;
      }

      event.stopPropagation();
      stickToBorder();
    },
    [canMovePoint, stickToBorder]
  );

  const touchcancel = useCallback(
    (event: TouchEvent) => {
      if (!canMovePoint(event)) {
        return;
      }

      event.stopPropagation();
      stickToBorder();
    },
    [canMovePoint, stickToBorder]
  );

  const addEventListeners = useCallback(() => {
    document.addEventListener('mouseup', mouseup, true);
    document.addEventListener('mousemove', mousemove, true);
    document.addEventListener('mousedown', mousedown, true);
    document.addEventListener('touchstart', touchstart, true);
    document.addEventListener('touchmove', touchmove, true);
    document.addEventListener('touchend', touchend, true);
    document.addEventListener('touchcancel', touchcancel, true);
  }, [
    mouseup,
    mousemove,
    mousedown,
    touchstart,
    touchmove,
    touchend,
    touchcancel,
  ]);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener('mouseup', mouseup, true);
    document.removeEventListener('mousemove', mousemove, true);
    document.removeEventListener('mousedown', mousedown, true);
    document.removeEventListener('touchstart', touchstart, true);
    document.removeEventListener('touchmove', touchmove, true);
    document.removeEventListener('touchend', touchend, true);
    document.removeEventListener('touchcancel', touchcancel, true);
  }, [
    mouseup,
    mousemove,
    mousedown,
    touchstart,
    touchmove,
    touchend,
    touchcancel,
  ]);

  useEffect(() => {
    addEventListeners();
    setTimeout(() => {
      stickToBorder();
    }, 0);

    return () => {
      removeEventListeners();
    };
  }, [addEventListeners, stickToBorder, removeEventListeners]);

  if (mode === MODE.POINT) {
    return (
      <div ref={elRef as any}>
        <PointIcon moving={moving} style={styleState} />
      </div>
    );
  }

  return <div />;
};

export default Point;

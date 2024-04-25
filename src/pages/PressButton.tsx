import { IonButton } from "@ionic/react";
import React, { useRef, useState } from "react";

export const PressButton = ({
  onLongPress,
  onPress,
  longPressTime = 500,
  ...props
}: {
  onLongPress?: () => void;
  onPress?: () => void;
  longPressTime?: number;
  [key: string]: any;
}) => {
  const [action, setAction] = useState("");

  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);

  function startPressTimer() {
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction("longpress");
      onLongPress?.();
    }, longPressTime);
  }

  function handleOnClick() {
    console.log("handleOnClick");
    if (isLongPress.current) return;
    setAction("click");
    clearTimeout(timerRef.current);
    onPress?.();
  }

  function handleOnMouseDown() {
    console.log("handleOnMouseDown");
    startPressTimer();
  }

  function handleOnMouseUp() {
    if (action === "longpress") return;
    console.log("handleOnMouseUp");
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    console.log("handleOnTouchStart");
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if (action === "longpress") return;
    console.log("handleOnTouchEnd");
    clearTimeout(timerRef.current);
  }

  return (
    <IonButton
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onClick={handleOnClick}
      {...props}
    />
  );
};

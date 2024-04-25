import {
  GestureDetail,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  createGesture,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import "./Tab1.css";
import { CameraPreviewPage } from "./CameraPreviewPage";

const Tab1: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [capturedData, setCapturedData] = useState<{
    value: string;
    type: "image" | "video";
  } | null>();

  if (open) {
    return (
      <CameraPreviewPage
        onCapture={(data) => {
          setCapturedData(data);
          setOpen(false);
        }}
        onCanceled={() => {
          setOpen(false);
        }}
      />
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Camera Preview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonButton
            expand="block"
            onClick={() => {
              setOpen(true);
            }}
          >
            Open Camera
          </IonButton>

          {capturedData?.type === "image" ? (
            <img
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
              src={capturedData.value}
              alt="captured"
            />
          ) : capturedData?.type === "video" ? (
            <video
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
              src={capturedData.value}
              controls
            />
          ) : null}
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

import { CameraPreview } from "@capacitor-community/camera-preview";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonProgressBar,
} from "@ionic/react";
import {
  arrowBack,
  camera,
  checkmark,
  close,
  refreshSharp,
  stop,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { PressButton } from "./PressButton";

export const CameraPreviewPage = ({
  onCapture,
  onCanceled,
}: {
  onCapture?: (data: { value: string; type: "image" | "video" }) => void;
  onCanceled?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [capturedData, setCapturedData] = useState<{
    value: string;
    type: "image" | "video";
  } | null>();
  const [recording, setRecording] = useState(false);

  const handleCaptureImage = () => {
    CameraPreview.capture({
      quality: 100,
    }).then((result) => {
      setCapturedData({
        value: `data:image/jpeg;base64,${result.value}`,
        type: "image",
      });
    });
  };
  //video variable as a file path and the video format is .mp4
  const handleCaptureVideo = async () => {
    try {
      console.log("[handleCaptureVideo] stopRecordVideo");
      const result = ((await CameraPreview.stopRecordVideo()) as any)
        .videoFilePath as string;
      console.log("[handleCaptureVideo] result", JSON.stringify(result));
      const file = await Filesystem.readFile({
        path: result.substring(result.lastIndexOf("/") + 1),
        directory: Directory.Cache,
      });
      const videoBase64 = file.data;
      setCapturedData({
        value: `data:video/mp4;base64,${videoBase64}`,
        type: "video",
      });
      setRecording(false);
    } catch (error) {
      console.error(error);
      setRecording(false);
    }
  };

  const handleStartRecordVideo = async () => {
    setRecording(true);
    CameraPreview.startRecordVideo({
      width: window.screen.width,
      height: window.screen.height,
      position: "rear",
    }).then((result) => {
      console.log(result);
    });
  };

  const startCameraPreview = async () => {
    setLoading(true);
    await CameraPreview.start({
      parent: "camera-preview",
      className: "camera-preview",
      position: "rear",
      toBack: true,
      height: window.screen.height,
      width: window.screen.width,
    });
    setLoading(false);
  };

  useEffect(() => {
    startCameraPreview();
    return () => {
      setCapturedData(null);
      setRecording(false);
      CameraPreview.stop();
    };
  }, []);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="content-camera-preview" fullscreen>
          <IonProgressBar type="indeterminate"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="content-camera-preview" fullscreen>
        <div id="camera-preview" className="camera-preview"></div>
        {recording ? (
          <IonButton
            className="capture-button"
            shape="round"
            size="large"
            onClick={handleCaptureVideo}
          >
            <IonIcon slot="icon-only" icon={stop} />
          </IonButton>
        ) : (
          <PressButton
            className="capture-button"
            shape="round"
            size="large"
            onLongPress={handleStartRecordVideo}
            onPress={handleCaptureImage}
          >
            <IonIcon slot="icon-only" icon={camera} />
          </PressButton>
        )}

        <IonButton
          className="flip-button"
          shape="round"
          size="large"
          onClick={() => {
            CameraPreview.flip();
          }}
        >
          <IonIcon slot="icon-only" icon={refreshSharp} />
        </IonButton>

        <IonButton
          className="back-button"
          shape="round"
          size="large"
          color="dark"
          onClick={() => {
            onCanceled?.();
          }}
        >
          <IonIcon slot="icon-only" icon={arrowBack} />
        </IonButton>

        {capturedData && (
          <>
            <IonButton
              className="close-button"
              shape="round"
              size="large"
              color="dark"
              onClick={async () => {
                setCapturedData(null);
                setRecording(false);
              }}
            >
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
            <IonButton
              className="accept-button"
              shape="round"
              size="large"
              onClick={() => {
                onCapture?.(capturedData);
              }}
            >
              <IonIcon slot="icon-only" icon={checkmark} />
            </IonButton>
          </>
        )}
        {capturedData?.type === "image" ? (
          <img
            className="captured-image"
            src={capturedData.value}
            alt="captured"
          />
        ) : capturedData?.type === "video" ? (
          <video className="captured-video" src={capturedData.value} controls />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

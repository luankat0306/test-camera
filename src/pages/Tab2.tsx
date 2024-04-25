import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

// <IonButton
// style={{ zIndex: "99999" }}
// onClick={() => {
//   CameraPreview.start({
//     parent: "camera-preview",
//     className: "camera-preview",

//     position: "front",
//   });
// }}
// >
// Show Front Camera Preview
// </IonButton>
// <IonButton
// style={{ zIndex: "99999" }}
// onClick={() => {
//   CameraPreview.start({
//     parent: "camera-preview",
//     className: "camera-preview",

//     position: "rear",
//   });
// }}
// >
// Show Rear Camera Preview 2
// </IonButton>
// <IonButton
// style={{ zIndex: "99999" }}
// onClick={() => {
//   CameraPreview.stop();
// }}
// >
// Stop
// </IonButton>
// <IonButton
// style={{ zIndex: "99999" }}
// onClick={() => {
//   CameraPreview.flip();
// }}
// >
// Flip
// </IonButton>
// <IonButton
// style={{ zIndex: "99999" }}
// onClick={async () => {
//   const cameraSampleOptions: CameraSampleOptions = {
//     quality: 50,
//   };

//   const result = await CameraPreview.captureSample(
//     cameraSampleOptions
//   );
//   setImageData(`data:image/jpeg;base64,${result.value}`);
// }}
// >
// Capture Sample
// </IonButton>
// {imageData ? (
// <div>
//   <img width="100px" src={imageData} alt="Most Recent" />
// </div>
// ) : (
// <div></div>
// )}
export default Tab2;

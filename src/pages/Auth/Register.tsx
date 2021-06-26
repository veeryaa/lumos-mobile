import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonViewDidEnter,
  IonText,
  IonBackButton,
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [handphone, setHandphone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();

  useIonViewDidEnter(async () => {
    console.log('ENTERING REGISTER');
  });

  const handleRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (handphone === '' || password === '' || email === '') return;
    if (handphone === undefined || password === undefined || email === '') return;

    fetch('http://localhost:8000/api/customer/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handphone, password, email }),
    }).then(res => res.json()).then(res => console.log(res));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register - Lumos Coffee Studio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form className="ion-padding" onSubmit={handleRegister}>
          <IonItem>
            <IonLabel position="floating">No Handphone</IonLabel>
            <IonInput onIonChange={(e) => setHandphone((e.target as HTMLInputElement).value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" onIonChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              onIonChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              type="password"
            />
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            Register
          </IonButton>
        </form>
        <IonText className="ion-margin-horizontal">
          Sudah punya akun? <Link to="/login">Login disini!</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;

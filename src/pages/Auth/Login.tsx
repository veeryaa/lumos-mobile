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
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [handphone, setHandphone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const history = useHistory();
  const storage = new Storage();

  useIonViewDidEnter(async () => {
    storage.create();
    const token = await storage.get('token');

    if (token === null || token === '') {
      history.push('/login');
    } else {
      history.push('/home');
    }

    console.log(token);
  });

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (handphone === '' || password === '') return;
    if (handphone === undefined || password === undefined) return;

    fetch('http://localhost:8000/auth/customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: handphone, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        const storage = new Storage();
        storage.create();
        storage.set('id', res.customer_id);
        storage.set('token', res.token);
        storage.set('handphone', res.handphone);
        history.push('/home');
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login - Lumos Coffee Studio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form className="ion-padding" onSubmit={handleLogin}>
          <IonItem>
            <IonLabel position="floating">No Handphone</IonLabel>
            <IonInput onIonChange={(e) => setHandphone((e.target as HTMLInputElement).value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              onIonChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              type="password"
            />
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            Login
          </IonButton>
        </form>
        <IonText className="ion-margin-horizontal">
          Belum punya akun? <Link to="/register">Daftar disini!</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;

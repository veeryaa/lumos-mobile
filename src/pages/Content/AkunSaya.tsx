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
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

type Akun = {
  nama: string;
  email: string;
  kota: string;
  tanggal_lahir: string;
  point: number;
  membership_id: string;
};

const AkunSaya: React.FC = () => {
  const [akun, setAkun] = useState<Akun>();
  const [nama, setNama] = useState('');
  const [kota, setKota] = useState('');
  const [email, setEmail] = useState('');

  const storage = new Storage();
  storage.create();
  useIonViewDidEnter(async () => {
    console.log(storage);
    const id = await storage.get('id');

    fetch(`http://localhost:8000/api/customer/find/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.result[0]);
        setNama(res.result[0].nama);
        setEmail(res.result[0].email);
        setKota(res.result[0].kota);
        setAkun(res.result[0]);
      });
  });

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    const id = await storage.get('id');

    console.log(id);
    console.log(nama);
    console.log(kota);
    console.log(storage);

    fetch(`http://localhost:8000/api/customer/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama, kota, email }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle>Akun Saya</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="home" />
            </IonButtons>
            <IonTitle size="large">Akun Saya</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form className="ion-padding" onSubmit={handleUpdate}>
          <IonItem>
            <IonLabel position="floating">Nama</IonLabel>
            <IonInput
              value={nama}
              onIonChange={(e) => setNama((e.target as HTMLInputElement).value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Kota</IonLabel>
            <IonInput
              value={kota}
              onIonChange={(e) => setKota((e.target as HTMLInputElement).value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Membership</IonLabel>
            <IonInput disabled type="email" value={akun?.membership_id} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Point</IonLabel>
            <IonInput disabled type="email" value={akun?.point} />
          </IonItem>
          <IonButton className="ion-margin-top ion-margin-horizontal" type="submit" expand="block">
            Update
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AkunSaya;

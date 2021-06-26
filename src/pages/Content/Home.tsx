import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSpinner,
  IonContent,
  IonTitle,
  IonItem,
  IonInput,
  IonMenu,
  IonList,
  IonLabel,
  IonDatetime,
  IonButton,
  IonRouterOutlet,
  IonCol,
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [kode, setKode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();

    const storage = new Storage();
    storage.create();

    await storage.remove('token');
    history.push('/login');
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const storage = new Storage();
      storage.create();

      const id = await storage.get('id');
      
      const claim = await fetch(
        `http://localhost:8000/api/transaction/claim/${selectedDate}-${kode}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cust_id: Number(id) }),
        }
      );

      const response = await claim.json();

      console.log(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonMenu side="start" contentId="first" swipeGesture={true}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Menu Lumos</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem href="/product">Produk</IonItem>
              <IonItem href="/kupon">Kupon</IonItem>
              <IonItem href="/trx">Transaksi</IonItem>
              <IonItem href="/akun">Akun Saya</IonItem>
              <IonItem onClick={handleLogout}>Logout</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="first"></IonRouterOutlet>

        <form className="ion-padding" onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Tanggal Transaksi</IonLabel>
            <IonDatetime
              displayFormat="MM/DD/YYYY"
              min="2020-01-01"
              max="2025-12-12"
              value={selectedDate}
              onIonChange={(e) => {
                setSelectedDate(e.detail.value!.split('T')[0]);
                console.log(e.detail.value!.split('T')[0]);
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Kode Transaksi</IonLabel>
            <IonInput
              value={kode}
              onIonChange={(e) => {
                setKode((e.target as HTMLInputElement).value.trim());
                console.log(kode);
              }}
            />
          </IonItem>
          <IonButton className="ion-margin-top ion-margin-horizontal" type="submit" expand="block">
            Klaim Transaksi
          </IonButton>
        </form>
        <IonCol>
          <div className="ion-text-center">{loading ? <IonSpinner name="lines-small" /> : ''}</div>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Home;

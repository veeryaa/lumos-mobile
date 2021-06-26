import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButton,
  IonButtons,
  useIonViewDidEnter,
  IonList,
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Transaksi: React.FC = () => {
  const [trx, setTrx] = useState<any[]>();
  const history = useHistory();

  useIonViewDidEnter(async () => {
    console.log('ENTERING TRX');
    try {
      const storage = new Storage();
      storage.create();
      const id = await storage.get('id');
  
      const claim = await fetch(`http://localhost:8000/api/transaction/custread/${id}`);
      const response = await claim.json();
      setTrx(response.result);
      console.log(response.result);
    } catch (err) {
      console.log(err)
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle>Transaksi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="home" />
            </IonButtons>
            <IonTitle size="large">Transaksi</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {trx?.map((e) => {
            return (
              <IonItem key={e.trx_id} onClick={(ev) => history.push(`/trx/${e.trx_id}`)}>
                <IonLabel>
                  <h2>TRX ID: {e.trx_id}</h2>
                  <h3>{e.tgl_transaksi.split('T')[0]}</h3>
                  <h3>Poin yang didapat: {e.point}</h3>
                  <h3>Nilai Transaksi: {e.nilai_transaksi}</h3>
                </IonLabel>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Transaksi;

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
import React, { SyntheticEvent, useState } from 'react';

const Kupon: React.FC = () => {
  const [coupon, setCoupon] = useState<any[]>();

  useIonViewDidEnter(() => {
    console.log('ENTERING');

    fetch('http://localhost:8000/api/coupon/read/')
      .then((res) => res.json())
      .then((res) => {
        setCoupon(res.result);
      });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle>Kupon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="home" />
            </IonButtons>
            <IonTitle size="large">Kupon</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {coupon?.map((e) => {
            return (
              <IonItem key={e.coupon_id}>
                <IonLabel>
                  <h2>{e.nama_kupon}</h2>
                  <h2>{e.deskripsi}</h2>
                  <h3>{e.product.nama_produk}</h3>
                  <h3>Potongan: {e.diskon}</h3>
                  <h3>
                    Berlaku Sampai:{' '}
                    {new Date(e.tgl_berakhir).toISOString().split('T')[0].slice(0, 10)}
                  </h3>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Kupon;

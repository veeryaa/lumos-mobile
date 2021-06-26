import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonItem,
  IonText,
  IonButtons,
  IonInput,
  IonList,
  IonLabel,
  IonBackButton,
  useIonViewDidEnter,
} from '@ionic/react';
import React, {  useState } from 'react';
import { useParams } from 'react-router';
import './style.css';

const Detail: React.FC = () => {
  const [trans, setTrans] = useState<any>();
  const [detailProduk, setDetailProduk] = useState<any[]>();
  const params: { id: string } = useParams();

  useIonViewDidEnter(async () => {
    console.log('ENTERING DETAIL');
    console.log(params);
    try {
      const detail = await fetch(`http://localhost:8000/api/transaction/read/${params.id}`);
      const response = await detail.json();
      setTrans(response.result[0]);
      console.log(response.result[0]);
      setDetailProduk(response.result[0].trx.TransactionDetail);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trx" />
          </IonButtons>
          <IonTitle>Transaksi Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/trx" />
            </IonButtons>
            <IonTitle className="ion-margin-top" size="large">
              Transaksi Detail
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel position="floating">Trx ID</IonLabel>
          <IonInput
            value={params.id}
            onIonChange={(e) => ((e.target as HTMLInputElement).value = params.id)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nilai Transaksi</IonLabel>
          <IonInput value={trans?.trx.nilai_transaksi} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Point yang didapat</IonLabel>
          <IonInput value={trans?.trx.point} />
        </IonItem>

        <IonText className="ion-ion-padding-top ion-margin-horizontal big-font">
          Detail Transaksi
        </IonText>
        <IonList>
          {detailProduk?.map((e) => {
            return (
              <IonItem key={e.id}>
                <IonLabel>
                  <h4>{e.product.nama_produk}</h4>
                  <h4>Rp {e.product.harga}</h4>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
        <div className="ion-margin-horizontal">
          {trans?.rekomendasi.consequent.toString() !== '' ? (
            <IonText className="ion-ion-margin-horizontal">
              Rekomendasi Produk Dari Kami:
              <p>{trans?.rekomendasi.consequent}</p>
            </IonText>
          ) : (
            ''
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detail;

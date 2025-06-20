---
categories:
- bilgisayar
date: 2011-06-12
layout: post
tags:
- english
- longread
- technology
title: Nokia Qt Creator ile hem Masaüstünde hem cep telefonunda çalışabilen Sqlite
  veritabanı uygulaması
---

Merhabalar;

Şu sıralar, daha önce Trolltech adlı firmaya ait olan şimdi ise Nokia tarafından alınmış QT ile C++ dili kullanarak yazılım geliştirmeyi 'tırmalıyorum'. İlk etapta biraz soğuk geliyor, daha önce hem Java ve Python ile ilgilenmiş, C++'den yollarını ayırmış biri olarak bir kaç umutsuz vak'adan sonra şeytanın bacağını kırdım.

Blog, fazla detay kaldıran bir yer olmadığından bazı konuların değerli okurlar tarafından bilindiğini varsayarak çalışmayı anlatacağım.

[QT](http://qt.nokia.com/ "Qt resmi sitesi") daha çok Linux kullanıcıları tarafından bilinen C/C++ ile görsel arayüz geliştirmeye yarayan bir kütüphanedir. Görsel arayüz geliştirilirken sırf kodla bu iş yapılabileceği gibi QT designer ile görsel olarak (visual basic'de olduğu gibi) sürükle bırak mantığı ile formlar ve program arayüzleri oluşturulabilir. Qt crossplatform olduğundan Windows altında da çalışmaktadır. Qt sadece C/C++ için değil, Python ve Java için de kullanılabilen bir kütüphanedir.

Qt'nin crossplatform sıfatını en çok hak ettiği nokta, Nokia'nın QT'yi satın almasından sonra, QT ile aynen masaüstüne program yazar gibi mobil programlar yazmaktır. Yazdığınız bir programı hem masaüstü hem de desktop için ayrı derleyerek kullanabiliyorsunuz.

Tüm bunlar için QT Creator programı indirmelisiniz. [http://qt.nokia.com/downloads](http://qt.nokia.com/downloads) adresinden Qt creator programını indirip bilgisayarınıza kurduktan sonra bir QT Widget projesi açarak mainwindow.h kısmına aşağıdaki kodları ekleyin:

```
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include
#include
#include 

namespace Ui {
    class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

/**
  slots: basligi altindaki tum kodlar mainwindow.cpp'de tanimli kodlardir.
  Sonradan gorsel editorde her bir fonksiyonu calistiracak olay (slot) atanabilir.

  **/
public slots:
    void KitapEkle();
    QSqlDatabase Baglan();
    void TabloYoksaOlustur();
    void KitapListele();

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
```

Özünde sadece public slots: kısmı altındaki fonksiyonları ekledik, kodların geri kalanı zaten Qt Creator tarafından otomatik olarak oluşruluyor. Daha sonra mainwindow.cpp kısmına da aşağıdaki kodları ekleyin:

```
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include
#include
#include 

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{

    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

/*ASAGIDAKI KODLAR SONRADAN EKLENENLERDIR UST KISIMDAKI KODLAR ISE QT CREATOR TRFNDN OTOMTK OLARAK OLUSTURULMUSTUR/QTSQL VE SONRAKI
KUTUPHANELER HARIC*/

//VERITABANI BAGLANTI FONKSIYONU mainwindowH'de DE TANIMLANMISTIR
QSqlDatabase MainWindow:: Baglan(){
    QSqlDatabase db = QSqlDatabase::addDatabase( "QSQLITE" );

      db.setDatabaseName( "kitapkurdu.db" );

      if( !db.open() )
      {
        qDebug() << db.lastError();
        qFatal( "Veritabani baglanti hatasi." );
      }

      qDebug( "Baglanti kuruldu!" );
      return db;

}

//SQLITE TABLOSU YOKSA OLUSTURAN KOD
void MainWindow::TabloYoksaOlustur(){

    QSqlQuery qry;

      qry.prepare( "CREATE TABLE IF NOT EXISTS kitap (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, kitapadi VARCHAR(90), sayfasayisi VARCHAR(10))" );
      if( !qry.exec() )
        qDebug() << qry.lastError();
      else
        qDebug() << "Tablo olusturuldu-SuatATAN Hayratidir!"; } //KAYIT EKLEME KODU void MainWindow::KitapEkle(){     QSqlDatabase db=Baglan();     TabloYoksaOlustur();     QString kitapadi=ui->lineEdit->text();
    QString sayfasayisi=ui->sayfasayisi->text();
    QSqlQuery qry;
    QString sql="INSERT INTO kitap (kitapadi, sayfasayisi) VALUES ('"+kitapadi+"', '"+sayfasayisi+"')";
    qry.prepare(sql);
      if( !qry.exec() )
        qDebug() << qry.lastError();      
 db.close();       //FORMDAKI BUTONA EKLENDI DIYE YAZDIRIYORUZ      
 ui->pushButton->setText("Eklendi");
      //SONRA DA FORMDAKI LISTEYI GUNCELLEIYORUZ
      KitapListele();

}

//KAYIT LISTELEME KODU
void MainWindow::KitapListele(){

   QSqlDatabase db=Baglan();

    QSqlQuery qry;
    qry.prepare( "SELECT * FROM kitap" );
      if( !qry.exec() )
        qDebug() << qry.lastError();
      else
      {
        qDebug( "Selected!" );

        QSqlRecord rec = qry.record();
        QString LISTE="";
        for( int r=0; qry.next(); r++ )

            LISTE=qry.value(1).toString()+"-"+qry.value(2).toString()+"\n"+LISTE;
            qDebug()<textEdit->setText(LISTE);

      }
}
```

Son olarak Run diyerek programı çalıştırın.

[![](/images/desktopdeneme1.png "DesktopDeneme1")](http://suatatan.wordpress.com/wp-content/uploads/2011/06/desktopdeneme1.png)

 

 

 

 

 

 

 

 

 

 

 

 

Programımız okuduğumuz kitapları kaydetmek için yapılmış basit bir program. Kitap adı ve sayfa sayısı girilip Kitap Ekle butonuna basılınca Listeye ekleniyor. Liste getir düğmesi ise ekran boşken kayıtlı kitap listesinin getirilmesini sağlayan fonksiyonun çalışmasını göstermek üzere fazladan konmuştur. Butonlar Qt'nin signals slots mantığı içinde tıklanınca ilgili fonksiyonları çalıştırmaktadır. Ekranda alt kısımdaki yeşil artının altında SignalS Slot Editörde görüleceği üzere 2 adet signal/slot vardır.

Programımızı bir de cep telefonu(nokia) için çalıştıralım:

[![](/images/mobildeneme1.png "MobilDeneme1")](http://suatatan.wordpress.com/wp-content/uploads/2011/06/mobildeneme1.png)

 

 

 

 

 

 

 

 

 

 

 

Gördüğünüz gibi aynı kodlar hiç değiştirmeden cep telefonumuzda çalıştırdık.

Program ne yapıyor?

Programımız Sqlite veritabanı ile girilen verileri kaydediyor. Sqlite veritabanı, kurulum gerektirmeyen ve tek dosya bazında çalışan bir veritabanı türüdür. Programımızı build ettiğimizde oluşan build klasöründe program çalışınca kitapkurdu.db adlı veritabanı dosyası oluşur. Sqlite Browser, Navicat türü programlarla bu veritabanı dosyasının içini de görebilirsiniz.

Yazdığınız programı telefonunuzda çalıştırabilmeniz için USB kablosunu bağlamanız gerekiyor. Geliştirme aşamasında ise ekranda görüldüğü üzere bilgisayarınızda çalışan simülatörü kullanabiliyorsunuz.

Qt çok keyifliymiş. Biraz daha ilerletip, Nokia Ovi platformu için bir şeyler yazmayı düşünüyorum. Şimdilik bu kadar, yeni şeyler öğrendikçe her zaman yaptığım gibi yemeyip içmeyip blogumda yazacağım.

[Buradan bu çalışmaya ait kaynak kodları indirebilirsiniz](http://www.box.net/shared/j4or1dcnysopz3tvar6f "Kaynak kodlar"). İnmezse haber verin:)

Başarılar.

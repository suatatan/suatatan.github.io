---
date: 2022-03-09
layout: post
tags:
- english
- longread
- technology
title: SQL'de farklı yerlerde ancak aynı iki tablonun içeriğinin aynı olup olmadığın
  kontrol etmek gerekirse senkronize etmek
---

```
--CHECKSUM yöntemi
--Eğer ki iki tablomuz sırf aynı mı değil mi diye bakıyorsak ve farklı çıktığında hangi kayıtların farklı olduğunun önemi yoksa
CHECKSUM TABLE original_table, backup_table;
--Bu sorgu iki tabloda Primary Key olmasını gerektirmez veriye bakar

--EXCEPT Yöntemi
--Eğer iki tablomuz aynı mı değil mi diye bakarken farklı olanları görmek istiyorsak şu sorguyu çalıştırız. 
--Eğer sonuç boş gelirse iki tablo aynıdır.
--Dolu gelirse farkları görürüz.

SELECT Col1, Col2, Col3, Col4, Col5 FROM Table_1
EXCEPT
SELECT Col1, Col2, Col3, Col4, Col5 FROM Table_2

--Peki tablolar aynı değilse ne yaparız?
--Eskiyi sil yeniden yaz ama foreing key varsa işe yaramaz işte o zaman
--Komple Source'den targete senkronizasyon böyle

 -- insert
INSERT INTO Target (ID, Value)
SELECT ID, Value FROM Source
WHERE NOT EXISTS (SELECT * FROM Target WHERE Target.ID = Source.ID);

-- update
UPDATE Target
SET Value = Source.Value
FROM Target INNER JOIN Source ON Target.ID = Source.ID

-- delete
DELETE FROM Target
WHERE NOT EXISTS (SELECT * FROM Source WHERE Target.ID = Source.ID)
```

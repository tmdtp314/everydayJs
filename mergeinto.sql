SELECT * FROM MC

 select *,datediff(DD,Dt_Customer,(first_value(Dt_Customer) over (order by dt_customer desc))) as [datediff]from mc order by [datediff] 



 merge into MC
 using (select id,datediff(DD,Dt_Customer,(first_value(Dt_Customer) over (order by dt_customer desc))) as [datediff]from mc)V
   on (V.id=MC.id and [datediff] <20)
   when matched THEN update set [status]='S';
   
 merge into GHOST
 using (select *,datediff(DD,Dt_Customer,(first_value(Dt_Customer) over (order by dt_customer desc))) as [datediff]from mc)V
   on (V.id=GHOST.id )
   WHEN MATCHED and V.[datediff] <100 THEN DELETE 
   WHEN MATCHED AND V.[DATEDIFF] > =100 THEN UPDATE SET [STATUS]='G';

  SELECT * FROM MC
   
 
   
   
   
   --NOT matched AND V.[DATEDIFF]>60 then INSERT (ID, Year_Birth, Education, Marital_Status, Income, Kidhome, Teenhome, Dt_Customer, Recency, MntWines, MntFruits, MntMeatProducts, MntFishProducts, MntSweetProducts, 
   --         MntGoldProds, NumDealsPurchases, NumWebPurchases, NumCatalogPurchases, NumStorePurchases, NumWebVisitsMonth, AcceptedCmp3, AcceptedCmp4, AcceptedCmp5, AcceptedCmp1, 
   --         AcceptedCmp2, Complain, Z_CostContact, Z_Revenue, Response, [status])
--			VALUES( V.ID, V.Year_Birth, V.Education, V.Marital_Status, V.Income, V.Kidhome, V.Teenhome, V.Dt_Customer, V.Recency, V.MntWines, V.MntFruits, V.MntMeatProducts, V.MntFishProducts, V.MntSweetProducts, 
 --           V.MntGoldProds, V.NumDealsPurchases, V.NumWebPurchases, V.NumCatalogPurchases, V.NumStorePurchases, V.NumWebVisitsMonth, V.AcceptedCmp3, V.AcceptedCmp4, V.AcceptedCmp5, V.AcceptedCmp1, 
  --          V.AcceptedCmp2, V.Complain, V.Z_CostContact, V.Z_Revenue, V.Response, V.[status]);

  SELECT dbo.FN_DATE(T_WKS.WKS_02, '1') AS WKS_02
		      ,dbo.FN_DATE(T_WKS.WKS_06, '1') AS WKS_06
		      ,T_WKS.*  
              ,M.MEM_02
			  ,PCB_02 AS MEM_32_NM
			  ,dbo.FN_WKSM_COLOR(@WKS_ID,WKS_01) as WKSM_LIST
			

          FROM T_WKS  
               INNER JOIN NSADMIN0.dbo.T_MEM M  
                ON WKS_ID = M.MEM_CID  
               AND WKS_98 = M.MEM_01  
			   LEFT OUTER JOIN NSADMIN0.DBO.T_PCB F
                 ON WKS_ID = F.PCB_CID
                AND M.MEM_32 = F.PCB_01  
			   LEFT OUTER JOIN (SELECT A.WKSM_01,A.WKSM_02 FROM T_WKSM A,NSADMIN0.DBO.T_MEM M2 WHERE A.WKSM_02 = M2.MEM_02) C
			     ON C.WKSM_01 = WKS_01			 
               
         WHERE WKS_ID = @WKS_ID  	
           AND (@WKS_03 = '' OR WKS_03 = @WKS_03)   --구분  
           AND (@WKS_05 = '' OR WKS_05 = @WKS_05)   --분류(DDL)  
           AND (@WKS_04 ='' OR WKS_04 LIKE '%' + @WKS_04 + '%' )     --업무내용  
           AND ((M.MEM_02 LIKE '%' + @WKS_1001 + '%') OR (PCB_02 LIKE'%'+@WKS_1001+'%'))    --요청자  
		   AND (@WKS_98 = '' OR C.WKSM_02 LIKE '%'+@WKS_98+'%' OR M.MEM_02 LIKE '%'+ @WKS_98+'%') -- 담당자
	   
         ORDER BY WKS_01 DESC   

         --------------------------


          DECLARE CUR_QYM2 CURSOR FOR
	           SELECT VALUE [LOTP_01] FROM dbo.FN_SPLIT(@LOTP_01, '^')
		               OPEN CUR_QYM2
			FETCH NEXT FROM CUR_QYM2 
			           INTO @LOTP_01
    				  WHILE @@FETCH_STATUS = 0
					  BEGIN

						 SELECT @LOTP_08 = LOTP_08,
						        @LOTP_07 = LOTP_07, 
								@LOTP_16 = LEFT(LOTP_16,3), 
								@LOTP_98 = LOTP_98
						   FROM T_LOTP
						  WHERE LOTP_01 = @LOTP_01
						    AND LOTP_ID = @LOTP_ID

						    SET @LOTP_02 = (SELECT RIGHT(CONVERT(VARCHAR(10),GETDATE(),112),8))

						   EXEC SP_QYM_CONTROL @GUBUN = 'CREATE_QYM',
						                       @QYM_ID = @LOTP_ID,
                                               @QYM_02 = @LOTP_01,		
						                       @QYM_03 = @LOTP_02,
                                               @LOT2_22 = @LOTP_16,
						                       @QYM_09 = @LOTP_08,
						                       @QYM_08 = @LOTP_07,
						                       @QYM_98 = @LOTP_98;

					  FETCH NEXT FROM CUR_QYM2 INTO @LOTP_01
					  END
				CLOSE CUR_QYM2																															
		   DEALLOCATE CUR_QYM2
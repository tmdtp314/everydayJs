DECLARE @myVar1 INT;
DECLARE @MYVar2 VARCHAR(10);
SET @myVar1 = SELECT VARINT FROM TABLE_A
SET @MYVar2 = 'VAR3'
SELECT TOP (@myVar1) VAR1, VAR2 FROM TABLE_B ORDER BY @MYVar2;

----------------------------------------------
TRY_CONVERT()  -- CONVERT()와 동일하지만 변환에 실패할 경우 NULL값 반환
TRY_PARSE()    -- PARSE()와 같지만 실패할 경우 NULL값 반환


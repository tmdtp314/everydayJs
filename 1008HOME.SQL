
CREATE TYPE USERTBLTYPE AS TABLE     -- 테이블 형식의 커스텀 타입생성
( 
   USERID      CHAR(8)
  ,NAME        NVARCHAR(10)
  ,BIRTHYEAR   INT
  ,ADDR        NCHAR(2)
)
GO
------------------------------------------------
CREATE PROCEDURE USE_TABLETYPEPARAMETER               
 @TBLPARAM USERTBLTYPE READONLY                       -- 테이블 타입의 커스텀 타입 사용 시 READONLY 꼭 붙여줘야!
  AS
    BEGIN 
          SELECT * FROM @TBLPARAM WHERE BIRTHYEAR<1970;
      END 
  GO


----------------------------------------------

  DECLARE @TBLVAR USERTBLTYPE
   INSERT INTO @TBLVAR
   SELECT USERID, NAME, BIRTHYEAR,ADDR FROM userTbl;     -- USERTBLTYPE 형식을 이용하여 프로시저 실행
     EXEC USE_TABLETYPEPARAM @TBLVAR
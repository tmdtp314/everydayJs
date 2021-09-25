-- 테이블 컬럼의 길이
SELECT COL_LENGTH('TABLENAME','COLUMNNAME')  -- nchar(3) 이면 6을 반환(nchar,nvarchar는 2배)

-- DB의 이름, ID
SELECT DB_ID(N'DB_NAME')
SELECT DB_NAME(5)  -- 5번


-- 

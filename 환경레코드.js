```
    환경 레코드 구성
    - 선언적 환경 레코드 : function, 변수, catch문에서 사용
    - 오브젝트 환경 레코드 : 글로벌 함수와 변수, with문 (동적)
        --> 예컨대 with문은 한번 돌 때마다 스코프가 만들어진다. (동적)
```

```
  글로벌 환경
   - 글로벌 오브젝트에서 사용
   - 렉시컬 환경 컴포넌트와 형태가 같다. 
   - 동적으로 변수 바인딩 (오브젝트 환경 레코드만 필요)

    실행 콘텍스트 : {
        글로벌 환경 : {
            환경 레코드:{
                오버젝트 환경 레코드: 글로벌 오브젝트
            },
            외부 렉시컬 환경 참조: null (무조건)
        }
    }
    ```

    /* 함수에서 var 키워드를 사용하지 않고 변수 서넌하면 글로벌 오브젝트에 설정됨 */
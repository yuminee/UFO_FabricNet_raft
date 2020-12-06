# HFB Server

### ChainCode invoke 

#### Json key:value 형식

- initWallet

  - POST /initWallet 

    | key  | value  | Description                                        |
    | ---- | ------ | -------------------------------------------------- |
    | id   | String | 받은 id 값으로 Token을 0으로 초기화 하여 지갑 생성 |



- getBalance

  - POST /getBalance

    | key  | value  | Description               |
    | ---- | ------ | ------------------------- |
    | id   | String | 받은 id 값의 Token return |


- getHistoryWallet

  - POST /getHistoryWallet

    | key  | value  | Description                         |
    | ---- | ------ | ----------------------------------- |
    | id   | String | 받은 id 값의 Wallet History return  |




- deleteWallet

  - POST /deleteWallet

    | key  | value  | Description             |
    | ---- | ------ | ----------------------- |
    | id   | String | 받은 id값의 wallet 지움 |

  

- chargeMoney

  - POST /chargeMoney

    | key    | value  | Description        |
    | ------ | ------ | ------------------ |
    | id     | String | 충전할 Wallet의 id |
    | amount | String | 충전할 금액        |

  



- transferMoney

  - POST /transferMoney

    | key      | value  | Description                     |
    | -------- | ------ | ------------------------------- |
    | sender   | String | 보내는 wallet Id                |
    | receiver | String | 받은 wallet Id                  |
    | amount   | String | sender 가 보내는 Token의 amount |

    


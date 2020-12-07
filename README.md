# UFO_FabricNet_raft

[1. 개발 환경](#개발-환경)   
[2. 개발 내용](#개발-내용)    
[3. 개발 과정](#개발-과정)       
[4. 개발 계획](#개발-계획)  
[5. Start UFO](#START-UFO)




## 개발 환경
* Mac & Ubuntu
* Docker & Docker Compose   
    Fabric Network 구동을 위한 컨테이너
* js    
    Chaincode 개발 언어

## 개발 내용
* 결제 관련 API 처리 위한 네트워크 개발
* 유저 등록, 충전, 송금, 잔액 확인 등 기능 개발
* CA를 통해 허가된 유저만 네트워크에 참가하게 관리

## 개발 과정

 [UFO Project 1 - understanding raft](https://yuminee.github.io/2020/11/17/Hyperledger%20fabric/raft_algorithm/)

 [UFO Project 2 - Hyperledger Fabric generate implementation](https://yuminee.github.io/2020/11/27/Hyperledger%20fabric/raft_algorithm2/)

 [UFO Project 3 - Hyperledger Fabric channel implementation](https://yuminee.github.io/2020/11/29/Hyperledger%20fabric/raft_algorithm3/)

 [UFO Project 4 - Hyperledger Fabric Chain Code implementation in Node js (1)](https://yuminee.github.io/2020/12/01/Hyperledger%20fabric/ufochaincode1/)
 
 [UFO Project 5 - Hyperledger Fabric SDK + application (1)](https://yuminee.github.io/2020/12/02/Hyperledger%20fabric/ufoserversdk1/)   
 
 [UFO Project 6 - Hyperledger Fabric SDK + application (2)](https://yuminee.github.io/2020/12/03/Hyperledger%20fabric/ufoserversdk2/)
 

## 개발 계획
* ChainCode
    * 뭐 있으려나?
* Network
    * 인증서 파일 S3로 업로드
    * 각종 환경설정 파일 관리 방법
    

## START UFO

[1. git clone UFO_FabricNet_raft](#git-clone-UFO-FabricNet-raft)   
[2. generate fabric network](#generate-fabric-network)    
[3. start ufo fabric network](#start-ufo-fabric-network)       
[4. install chaincode and instantiate](#install-chaincode-and-instantiate)  
[5. invoke chaincode](#invoke-chaincode)	

### git-clone-UFO-FabricNet-raft

```
git clone https://github.com/yuminee/UFO_FabricNet_raft.git
```

### generate fabric network

```
cd ufo-network
 ./byfn.sh generate -o etcdraft -s couchdb -l node
```

### start ufo fabric network

```
./byfn.sh up -o etcdraft -s couchdb -l node
```

### install chaincode and instantiate

[1. Package ChainCode](#Package-ChainCode) 		

[2. ChainCode install](#ChainCode-install) 	

[3. ChainCode instantiate](#ChainCode-instantiate) 

#### Package ChainCode

```
docker exec cli peer chaincode package -n ufo -l node -p /opt/gopath/src/github.com/chaincode/ufo/javascript -v 0 -s -S ccpack.out
```

위의 명령어를 통해서 체인코드를 패키징 해준다.



#### ChainCode install

우리는 총 2개의 조직에 각각 2개씩 4개의 피어가 있으므로 각각의 피어에 체인코드를 install 해준다.



- peer0.sales.ufo.com:7051

  ```
  docker exec -e CORE_PEER_LOCALMSPID=SalesMSP -e CORE_PEER_ADDRESS=peer0.sales.ufo.com:7051 -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/users/Admin@sales.ufo.com/msp -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt cli peer chaincode install ccpack.out -l node
  
  ```

  

- peer1.sales.ufo.com:8051

  ```
  docker exec -e CORE_PEER_LOCALMSPID=SalesMSP -e CORE_PEER_ADDRESS=peer1.sales.ufo.com:8051 -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/users/Admin@sales.ufo.com/msp -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt cli peer chaincode install ccpack.out -l node
  
  ```



- peer0.customer.ufo.com:9051

  ```
  docker exec -e CORE_PEER_LOCALMSPID=CustomerMSP -e CORE_PEER_ADDRESS=peer0.customer.ufo.com:9051 -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/users/Admin@customer.ufo.com/msp -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt cli peer chaincode install ccpack.out -l node
  
  ```



- peer1.customer.ufo.com:10051

  ```
  docker exec -e CORE_PEER_LOCALMSPID=CustomerMSP -e CORE_PEER_ADDRESS=peer1.customer.ufo.com:10051 -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/users/Admin@customer.ufo.com/msp -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt cli peer chaincode install ccpack.out -l node
  
  ```



#### ChainCode instantiate

```
docker exec -e CORE_PEER_LOCALMSPID=SalesMSP -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/users/Admin@sales.ufo.com/msp cli peer chaincode instantiate -o orderer.ufo.com:7050 -C ufochannel -n ufo -l node -v 0 -c '{"Args":[]}' -P 'AND('\''SalesMSP.member'\'','\''CustomerMSP.member'\'')' --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/ufo.com/orderers/orderer.ufo.com/msp/tlscacerts/tlsca.ufo.com-cert.pem 

```

### Invoke ChainCode

- initWallet

  ```
  docker exec -e CORE_PEER_LOCALMSPID=SalesMSP -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/users/Admin@sales.ufo.com/msp cli peer chaincode invoke -o orderer.ufo.com:7050 -C ufochannel -n ufo -c '{"function":"initWallet","Args":["2015116581"]}' --waitForEvent --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/ufo.com/orderers/orderer.ufo.com/msp/tlscacerts/tlsca.ufo.com-cert.pem --peerAddresses peer0.sales.ufo.com:7051 --peerAddresses peer1.sales.ufo.com:8051 --peerAddresses peer0.customer.ufo.com:9051 --peerAddresses peer1.customer.ufo.com:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt
  
  ```

  위에서 function에 initWallet를 Arg에 id 값을 넣어준다.

  **'{"function":"initWallet","Args":["2015116581"]}'**

  - Couchdb 화면

  ![image](https://user-images.githubusercontent.com/33755241/101023683-751bac80-35b6-11eb-837a-9b125b1f0b56.png)

- chargeMoney

  ```
  docker exec -e CORE_PEER_LOCALMSPID=SalesMSP -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/users/Admin@sales.ufo.com/msp cli peer chaincode invoke -o orderer.ufo.com:7050 -C ufochannel -n ufo -c '{"Args":["chargeMoney","2015116581","5000"]}' --waitForEvent --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/ufo.com/orderers/orderer.ufo.com/msp/tlscacerts/tlsca.ufo.com-cert.pem --peerAddresses peer0.sales.ufo.com:7051 --peerAddresses peer1.sales.ufo.com:8051 --peerAddresses peer0.customer.ufo.com:9051 --peerAddresses peer1.customer.ufo.com:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt
  
  ```

  **'{"Args":["chargeMoney","2015116581","5000"]}'**

  방금 가입한 "2015116581" 이라는 id에 "5000"만큼 충전한다.

  - couchDB : Token이 0에서 5000으로 증가했다.

    ![image](https://user-images.githubusercontent.com/33755241/101023874-b3b16700-35b6-11eb-941a-d4b3e77df735.png)

- transferMoney

  ```
  docker exec -e CORE_PEER_LOCALMSPID=SalesMSP -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/users/Admin@sales.ufo.com/msp cli peer chaincode invoke -o orderer.ufo.com:7050 -C ufochannel -n ufo -c '{"Args":["transferMoney","2015116581","20131111","1000"]}' --waitForEvent --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/ufo.com/orderers/orderer.ufo.com/msp/tlscacerts/tlsca.ufo.com-cert.pem --peerAddresses peer0.sales.ufo.com:7051 --peerAddresses peer1.sales.ufo.com:8051 --peerAddresses peer0.customer.ufo.com:9051 --peerAddresses peer1.customer.ufo.com:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sales.ufo.com/peers/peer0.sales.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/customer.ufo.com/peers/peer0.customer.ufo.com/tls/ca.crt
  
  ```

  **'{"Args":["transferMoney","2015116581","20131111","1000"]}'**

  아까 가입한 "2015116581" 에 추가적으로 "20131111" 이라는 id를 initWallet 해주었고

  "20131111"에게 "2015116581" 이 "1000" 만큼 보낸다.

  - CouchDB : 5000이 있었던 "2015116581" 은 1000을 보내서 4000이 되었고, 

    "20131111" 은 1000을 받아서 Token이 1000이 되었다.

  ![image](https://user-images.githubusercontent.com/33755241/101024091-fa06c600-35b6-11eb-9b92-3f75b303abf9.png)

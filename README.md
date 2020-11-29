# UFO_FabricNet_raft

[1. 개발 환경](#개발-환경)   
[2. 개발 내용](#개발-내용)    
[3. 개발 과정](#개발-과정)       
[4. 개발 계획](#개발-계획)  
[5. 개발 Blog](#개발-Blog)




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
* ChainCode
    * chargeMoney, transferMoney, getWallet 함수 개발
* Network
    * Network에 필요한 요소들 설정(Org, Channel, Orderer, Peer)
    * Docker Compose를 통해 UP
    * CA Wallet을 CouchDB로 바꿈
    * Peer의 World State를 CouchDB로 바꿈

## 개발 계획
* ChainCode
    * 뭐 있으려나?
* Network
    * 인증서 파일 S3로 업로드
    * 각종 환경설정 파일 관리 방법
    
 ## 개발 Blog
 
 [raft algorithm ① - understanding raft](https://yuminee.github.io/2020/11/17/Hyperledger%20fabric/raft_algorithm/)
 
 [raft algorithm ② - Hyperledger Fabric generate implementation](https://yuminee.github.io/2020/11/27/Hyperledger%20fabric/raft_algorithm2/)

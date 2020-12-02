'use strict';

const shim = require('fabric-shim');


const { Contract } = require('fabric-contract-api');

class Ufo extends Contract{

 
    async Init(ctx) {
        console.info('=========== Instantiated Chaincode ===========');
        console.info('Transaction ID: ' + ctx.stub.getTxID());
        return shim.success();
    }
    
    /** regisiter user */

    async initWallet(ctx, id){

        console.info('========== START : initWallet ===========')
        

        //Declare wallet
        let wallet = {

            ID:id,
            Token:"0",
            

            }
        
        await ctx.stub.putState(id,Buffer.from(JSON.stringify(wallet)));
        console.log(wallet);
        console.info('========== END : initWallet ===========')
        
     
      
    }

    async getBalance(ctx, id){

        console.info('========== START : getBalance ===========')

        let walletId = id;

        const walletAsBytes = await ctx.stub.getState(walletId);

        if (!walletAsBytes || walletAsBytes.toString().length <= 0) {
            throw new Error(`${id} does not exist`);
        }

        console.log(walletAsBytes.toString());
        walletInfo = JSON.parse(walletAsBytes.toString());
        walletToken = walletInfo.Token;
        console.info('========== END : getBalance ===========')
        return walletToken;
    }

    async chargeMoney(ctx, id, amount){

        console.info('========== START : chargeMoney ===========')

        let charger = id
        const walletAsBytes = await ctx.stub.getState(charger);

        if (!walletAsBytes || walletAsBytes.toString().length <= 0) {
            throw new Error(`${id} does not exist`);
        }
        
        let walletInfo = {};
        walletInfo = JSON.parse(walletAsBytes.toString());
        console.log(walletInfo)

        let walletToken = parseInt(walletInfo.Token);
        amount = parseInt(amount);

        walletInfo.Token = (walletToken + amount).toString();
        
        let updatedWalletAsBytes = JSON.stringify(walletInfo);

        await ctx.stub.putState(charger, Buffer.from(updatedWalletAsBytes));
        

        console.info('========== END : chargeMoney ===========')


        


    }



    async transferMoney(ctx, senderId, receiverId, amount){
       
        console.info('========== START : transferMoney ===========')
        
        let sender = senderId
        let receiver = receiverId

        console.log("Sender :" + sender + ", Receiver :" + receiver + ", amount : " + amount);

       
        let receiverAsBytes = await ctx.stub.getState(receiver)
        if (!receiverAsBytes || receiverAsBytes.toString().length <= 0) {
            throw new Error(`${receiver} does not exist`);
        }

        let receiverInfo = {};
        receiverInfo = JSON.parse(receiverAsBytes.toString());
        let receiverToken = parseInt(receiverInfo.Token)
            

        let senderAsBytes = await ctx.stub.getState(sender)
        if (!senderAsBytes || senderAsBytes.toString().length <= 0) {
            throw new Error(`${senderId} does not exist`);
        }

        let senderInfo = {};
        senderInfo = JSON.parse(senderAsBytes.toString());
        let senderToken = parseInt(senderInfo.Token)
        
        amount = parseInt(amount)
        if (amount < 0) {
            return shim.Error("you can't transfer less than 0")
        }
        
        if (amount > senderToken) {
            return shim.Error(`${senderId} doesn't have enough money to send`)
        }
        
        receiverInfo.Token = (receiverToken + amount).toString();
        senderInfo.Token = (senderToken - amount).toString();
    
        var updatedSenderAsBytes = JSON.stringify(senderInfo);
        var updatedReceiverAsBytes = JSON.stringify(receiverInfo);
    
        await ctx.stub.putState(sender, Buffer.from(updatedSenderAsBytes));
        await ctx.stub.putState(receiver, Buffer.from(updatedReceiverAsBytes));

       
    
       



    }

    async deleteWallet(ctx, id){

        console.info('========== START : deleteWallet ===========')


        await ctx.stub.deleteState(id); 
   
        console.info('========== END : deleteWallet ===========')


    }

    async changeOrg(ctx, id, org){

    }

    async getWalletKey(ctx, args, thisClass){
        
        let walletId = args[0]
        console.info('-start getwalletKey: %s\n', walletId);

        
        let resultsIterator = await ctx.stub.getHistoryForKey(walletId);
        let method = thisClass['getAllResults'];
        let results = await method(resultsIterator, true); 

        return Buffer.from(JSON.stringify(results));
    }

    async getAllResults(iterator, isHistory) {
        let allResults = [];
        while (true) {
          let res = await iterator.next();
    
          if (res.value && res.value.value.toString()) {
            let jsonRes = {};
            console.log(res.value.value.toString('utf8'));
    
            if (isHistory && isHistory === true) {
              jsonRes.TxId = res.value.tx_id;
              jsonRes.Timestamp = res.value.timestamp;
              jsonRes.IsDelete = res.value.is_delete.toString();
              try {
                jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
              } catch (err) {
                console.log(err);
                jsonRes.Value = res.value.value.toString('utf8');
              }
            } else {
              jsonRes.Key = res.value.key;
              try {
                jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
              } catch (err) {
                console.log(err);
                jsonRes.Record = res.value.value.toString('utf8');
              }
            }
            allResults.push(jsonRes);
          }
          if (res.done) {
            console.log('end of data');
            await iterator.close();
            console.info(allResults);
            return allResults;
          }
        }
      }
   

    

}
module.exports = Ufo;
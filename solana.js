var web3 = window.solana;

function setHeader()
{             
              document.getElementById("submitbtn").style.visibility = "hidden";
              document.getElementById("currnet").style.visibility = "visible";
              const solnet = document.getElementById("network");
              if(solnet.value === "mainnet-beta")
              document.getElementById("currnet").innerHTML = "You're transacting on Mainnet";
              if(solnet.value === "devnet")
              document.getElementById("currnet").innerHTML = "You're transacting on Devnet";
              if(solnet.value === "testnet")
              document.getElementById("currnet").innerHTML = "You're transacting on Testnet";
              const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(solnet.value), 'confirmed');
      
              connection.getBalance(web3.publicKey).then(function (value) {
      
              console.log("Balance: " + (value/1000000000) + " SOL");
              document.getElementById("balance").innerText = (value/1000000000 + " SOL");
            })
}

async function accountchanged(){
  if (web3.publicKey === null) {
    await web3.connect();
    document.getElementById("address_p").innerText = "Address: " + web3.publicKey.toString();
   
  } else {
    document.getElementById("address_p").innerText = "Address: " + web3.publicKey.toString();
    
  }
}

console.log("Solana web3: ",solanaWeb3);
async function connectPhantomWallet() {
    web3.on("accountChanged",() => accountchanged())
    web3.on("accountChanged",() => setHeader())
    web3.on("connect", () => document.getElementById("status").innerText="Connected");
      const isPhantomInstalled = web3 && web3.isPhantom;
      if ( isPhantomInstalled ) {
        if ("solana" in window) {
         
          console.log("Phantom is Present");
          if (web3.isPhantom) {
            if (!web3.isConnected) {
              try {  
                document.getElementById("tranotify").hidden = false; 
                document.getElementById("buffer").style.visibility = "hidden";
                document.getElementById("enter").style.visibility = "visible";
                document.getElementById("details").style.visibility = "visible";
                document.getElementById("address_p").style.visibility = "visible";
                document.getElementById("balance").style.visibility = "visible";
                document.getElementById("balance_p").style.visibility = "visible";
                document.getElementById("tranotify").style.visibility = "visible";
                document.getElementById("tranotify_p").style.visibility = "visible";
                document.getElementById("sendSol").style.visibility = "visible";
                document.getElementById("addresssol").style.visibility = "visible";
                document.getElementById("solvalue").style.visibility = "visible";
                document.getElementById("network").style.visibility = "visible";
                document.getElementById("currnet").style.visibility = "visible";
                document.getElementById("submitbtn").style.visibility = "hidden";
                
                document.getElementById("disconnectSol").style.visibility = "visible";
                    
                
                const solnet = document.getElementById("network");
                if(solnet.value === "mainnet-beta")
                document.getElementById("currnet").innerHTML = "You're transacting on Mainnet";
                if(solnet.value === "devnet")
                document.getElementById("currnet").innerHTML = "You're transacting on Devnet";
                if(solnet.value === "testnet")
                document.getElementById("currnet").innerHTML = "You're transacting on Testnet";
               
                await web3.connect();
                
                document.getElementById("address_p").innerText = ("Address: " + web3.publicKey.toString());
                
                const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(solnet.value), 'confirmed');
        
                connection.getBalance(web3.publicKey).then(function (value) {
        
                console.log("Balance: " + (value/1000000000) + " SOL");
                document.getElementById("balance").innerText = (value/1000000000 + " SOL");
        
                });
                return web3;
              } catch (err) {
              }
            } else {
              await web3.connect();
              return web3;
            }    
          }
        } else {
          return false;
        }
      } else {
        return false;
        
      }
  }
  
  async function sendPhantom()
  {
    // var web3 = solanaWeb3;
    const receiver = document.getElementById("addresssol");
    const solvalue = document.getElementById("solvalue");
    try {
      var finalReceiver = new solanaWeb3.PublicKey(receiver.value);
    } catch (error) {
      alert(error.message);
    }
    
    const sol = solvalue.value;
    if(solvalue.value < 0)
    {
      alert("Enter SOL value greater than 0 to transact");
    }
    if(finalReceiver.toString() === web3.publicKey.toString())
    {
      alert("Sending SOL to same account is not permitted");
      return;
    }
    console.log("Receiver's Address ---> ", receiver.value);
    console.log("SOL value to be sent ---> ",solvalue.value);

    console.log("Empty receiver  --->  ",receiver.value);
    /* var sol = solvalue.value */
    console.log("SOL VALUE ---> ",solvalue.value);

     const solnet = document.getElementById("network")
    
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(solnet.value), 'confirmed');

    console.log("Receive wallet ---> ",finalReceiver.toString());
    console.log("Sender address ---> ",web3.publicKey.toString());  

   

    const transaction = await new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: web3.publicKey,
        toPubkey: finalReceiver,
        lamports: sol * web3.LAMPORTS_PER_SOL //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
      }),
    );
  
    // Setting the variables for the transaction
    transaction.feePayer = await web3.publicKey;
    const blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;
  
    // Transaction constructor initialized successfully
    if(transaction) {
      console.log("Txn created successfully");
    }
    try {
      
    // Request creator to sign the transaction (allow the transaction)
    const signed = await web3.signTransaction(transaction);
    // The signature is generated
    const signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    await connection.confirmTransaction(signature);
  
    //Signature will be printed here
    console.log("Signature: ", signature);
    document.getElementById("tranotify").innerText = ("Signature " + signature)

    alert("Transaction Successful")  ;
    } catch (error) {
      alert("Transaction Cancelled");
      document.getElementById("tranotify").innerText = ("Error " + error.message);
    }
    
  }
  
async function disconnectPhantom(){
  web3.disconnect();
  web3.request({ method: "disconnect" });
  // web3.on('disconnect', () => console.log("::::: Phantom Disconnected ::::"))
  web3.on('disconnect', () => {
    document.getElementById("address_p").style.visibility = "hidden";
    document.getElementById("balance").style.visibility = "hidden";
    document.getElementById("balance_p").style.visibility = "hidden";
    document.getElementById("tranotify_p").style.visibility = "hidden";
    document.getElementById("sendSol").style.visibility = "hidden";
    document.getElementById("addresssol").style.visibility = "hidden";
    document.getElementById("solvalue").style.visibility = "hidden";
    document.getElementById("details").style.visibility = "hidden";
    // document.getElementById("network").style.visibility = "hidden";
    document.getElementById("enter").style.visibility = "hidden";
    document.getElementById("disconnectSol").style.visibility = "hidden";
    document.getElementById("network").style.visibility = "hidden";
    document.getElementById("status").innerText= "Disconnected";
    document.getElementById("address_p").innerText = "Address: ";
    document.getElementById("balance").innerText = " SOL";
    document.getElementById("tranotify").hidden = true;
    document.getElementById("disconnectSol").style.visibility = "hidden";
    document.getElementById("submitbtn").style.visibility = "visible";
    document.getElementById("network").style.visibility = "hidden";
    document.getElementById("currnet").style.visibility = "hidden";
  })
  web3.disconnect();
  alert("Wallet Disconnected");
}
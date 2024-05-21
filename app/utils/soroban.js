import "dotenv/config"
import { getPublicKey } from "@stellar/freighter-api"
import { userSignTransaction } from "./freighter"

import {
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  Address,
} from "@stellar/stellar-sdk"

import { contracts } from "../constants"

let params = {
  fee: BASE_FEE,
  networkPassphrase: Networks.TESTNET,
}

const rpcUrl = "https://soroban-testnet.stellar.org"

console.log("RPC url:", rpcUrl)

async function contractInt(caller, contractAddress, functName, values) {
  const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true })
  const contract = new Contract(contractAddress)
  const sourceAccount = await provider.getAccount(caller)
  let buildTx
  if (values == null) {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName))
      .setTimeout(30)
      .build()
  } else {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName, ...values))
      .setTimeout(30)
      .build()
  }
  let _buildTx = await provider.prepareTransaction(buildTx)
  let prepareTx = _buildTx.toXDR()
  let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller)
  let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET)
  try {
    let sendTx = await provider.sendTransaction(tx).catch(function (err) {
      return err
    })
    if (sendTx.errorResult) {
      throw new Error("Unable to submit transaction")
    }
    if (sendTx.status === "PENDING") {
      let txResponse = await provider.getTransaction(sendTx.hash)
      while (txResponse.status === "NOT_FOUND") {
        txResponse = await provider.getTransaction(sendTx.hash)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      if (txResponse.status === "SUCCESS") {
        let result = txResponse.returnValue
        return result
      }
    }
  } catch (err) {
    return err
  }
}

async function readContract(caller, contractAddress, functName, values) {
  const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true })
  const contract = new Contract(contractAddress)
  const sourceAccount = await provider.getAccount(caller)
  let buildTx
  if (values == null) {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName))
      .setTimeout(30)
      .build()
  } else {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName, ...values))
      .setTimeout(30)
      .build()
  }
  let response = await provider.simulateTransaction(buildTx)
  return response
}

export async function hello(to) {
  const caller = await getPublicKey()
  const arg = nativeToScVal(to, { type: "symbol" })
  const response = await readContract(caller, contracts.helloWorld, "hello", [arg])
  console.log(response)
  let ans1 = response?.result?.retval?._value[0]._value.toString()
  let ans2 = response?.result?.retval?._value[1]._value.toString()
  return [ans1, ans2]
}

export async function increment() {
  const caller = await getPublicKey()
  const response = await contractInt(caller, contracts.increment, "increment", null)
  console.log(response)
  let value = response._value
  return value
}

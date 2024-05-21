import { requestAccess, signTransaction, getPublicKey } from "@stellar/freighter-api"

const retrievePublicKey = async () => {
  let publicKey = ""
  let error = ""
  try {
    publicKey = await getPublicKey()
  } catch (e) {
    error = e
  }
  if (error) {
    return error
  }
  return publicKey
}

export async function connectWallet() {
  let publicKey = ""
  let error = ""
  try {
    publicKey = await requestAccess()
  } catch (e) {
    error = e
  }
  if (error) {
    return error
  }
  return publicKey
}

const userSignTransaction = async (xdr, network, signWith) => {
  let signedTransaction = ""
  let error = ""
  try {
    signedTransaction = await signTransaction(xdr, {
      network,
      accountToSign: signWith,
    })
  } catch (e) {
    error = e
  }
  if (error) {
    return error
  }
  return signedTransaction
}

export { retrievePublicKey, userSignTransaction }

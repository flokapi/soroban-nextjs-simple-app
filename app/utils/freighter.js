import { signTransaction } from "@stellar/freighter-api"

export async function userSignTransaction(xdr, network, signWith) {
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

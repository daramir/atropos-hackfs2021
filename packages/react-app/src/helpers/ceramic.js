// import type { CeramicApi } from '@ceramicnetwork/common'
import Ceramic from "@ceramicnetwork/http-client";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import { TileDocument } from "@ceramicnetwork/stream-tile";
// import type { CeramicApi } from '@ceramicnetwork/common'
import { IDX } from "@ceramicstudio/idx";
import { ThreeIdConnect, EthereumAuthProvider } from "@3id/connect";

// declare global {
//   interface Window {
//     ceramic?: CeramicApi
//     [index: string]: any
//   }
// }

export const threeID = new ThreeIdConnect();

export async function createCeramic() {
  const ceramic = new Ceramic("https://ceramic-clay.3boxlabs.com");
  //   return Promise.resolve(ceramic as CeramicApi)
  return Promise.resolve(ceramic);
}

// export function createIDX(ceramic: CeramicApi): IDX {
export function createIDX(ceramic) {
  const idx = new IDX({ ceramic });
  // window.idx = idx
  return idx;
}

// export async function getProvider(): Promise<DIDProvider> {
export async function get3IdWithEthereumAuthProvider(ethSigner) {
  const address = await ethSigner.getAddress();
  await threeID.connect(new EthereumAuthProvider(ethSigner.provider.provider, address));
  return threeID.getDidProvider();
}

export { Caip10Link, TileDocument };

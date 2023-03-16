import { JSEncrypt } from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair
// Web site that generated the key pair : http://web.chacuo.net/netrsakeypair
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDk2i3FbqpNdYqa6iWORFSq3BNP\n' +
  '4QIw7pFVNZcI3Ps1fwvc+4qKE2cm1EJnzrJtnLqOCFSw/RFHRo80qEKKNx+AWhjR\n' +
  'G6XhvB+tWyaPKaoFKGpD3v+/2ORw2b35+RrZGsx9Z++FGPK03I1CNVxV6ZTBUoI4\n' +
  '9e5gb9EEjgVDDJoZUwIDAQAB'

// 加密
// Encryption
export function encrypt (txt) {
  const encryptor = new JSEncrypt()
  // 设置公钥
  // Set public key
  encryptor.setPublicKey(publicKey)
  // 对需要加密的数据进行加密
  // Encrypt the data that needs to be encrypted
  return encryptor.encrypt(txt)
}

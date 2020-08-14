/* 
包含一些工具函数的模块
*/

import { v4 as uuidv4 } from 'uuid';


/* 
获取用户临时ID
1. 从localStorage中读取保存的userTempId, 如果有, 直接返回它
2. 如果没有, 创建一个新的, 保存到localStroage中, 返回它
*/
export function getUserTempId() {
  // 1. 从localStorage中读取保存的userTempId, 如果有, 直接返回它
  let userTempId = localStorage.getItem('USER_TEMP_ID_KEY')
  if (userTempId) return userTempId
  // 2. 如果没有, 创建一个新的, 保存到localStroage中, 返回它
  userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  localStorage.setItem('USER_TEMP_ID_KEY', userTempId)

  return userTempId
}

/* 
保存用户信息
*/
export function saveUserInfo(userInfo) {
  window.localStorage.setItem('USER_INFO_KEY', JSON.stringify(userInfo))
}

/* 
读取用户信息
*/
export const getUserInfo = () => JSON.parse(localStorage.getItem('USER_INFO_KEY')) || {}

/* 
删除用户信息
*/
export const removeUserInfo = () => localStorage.removeItem('USER_INFO_KEY')
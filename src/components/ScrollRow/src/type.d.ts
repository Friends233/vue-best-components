/*
 * @Description: 类型提示
 * @Author: Friends233
 */
export interface AnyObj {
  [propName: string]: string
}
export interface ConfigType<T> {
  /** 需要渲染的数据*/
  list: T | AnyObj[],
  /** 延时，默认50，越高越慢*/
  duration?: number,
  /** 渲染函数，渲染每一行*/
  renderRow: (row: AnyObj, index: number) => VNode
}
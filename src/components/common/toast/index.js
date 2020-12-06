import Toast from "./Toast";

const obj = {

}

obj.install = function (Vue) {
  // 1. 创建组建构造器
  const constructor = Vue.extend(Toast)

  // 2. new的方式，根据组件构造器，创建出一个对象
  const toast = new constructor()

  // 3. 将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))

  // 4. toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj

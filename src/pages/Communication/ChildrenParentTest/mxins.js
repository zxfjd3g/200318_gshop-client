export const cpMixin = {
  methods: {
    borrowMoney (count) {
      this.money -= count
    },
    gaveMoney (count) {
      this.money -= count
      // 给父组件增加count
      this.$parent.money += count
    }
  }
}
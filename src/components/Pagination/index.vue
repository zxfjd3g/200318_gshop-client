<template>
  <div class="pagination">
    <button >上一页</button>
    <button>1</button>
    <button disabled>···</button>

    <button>3</button>
    <button>4</button>
    <button class="active">5</button>
    <button>6</button>
    <button>7</button>
    
    <button>···</button>
    <button>9</button>
    <button>下一页</button>
    
    <button style="margin-left: 30px" disabled>共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      currentPage: { // 当前页码
        type: Number,
        default: 1,
        // required: true
      },
			total: { // 总数量
        type: Number,
        default: 0,
        // required: true
      },
			pageSize: { // 每页数量
        type: Number,
        default: 10
      },
			showPageNo: { // 连续页码数 (一般是奇数)
        type: Number,
        default: 5
      }
    },

    data () {
      return {
        // 将传入当前页码作为内部的当前页码
        myCurrentPage: this.currentPage || 1 
      }
    },

    computed: {
      /* 
      总页数
      */
      totalPages () {
        const {total, pageSize} = this   // 31 10 ==> 4
        return Math.ceil(total/pageSize) // 需要向上取整
      },


      /* 
      计算出连续页码的start和end [3, 7]  {start: 3, end: 7}
      start最小值为1
      end最大值为totalPages
      start到end的数量最大是showPageNo: 
        end = start + showPageNo - 1
        start = end - showPageNo + 1
      */
      startEnd () {
        // 取出依赖(相关)数据
        const {myCurrentPage, showPageNo, totalPages} = this

        let start, end
        // 计算产生需要的结果数据
        // 计算start
        /* 
        myCurrentPage, showPageNo, totalPages
          4                 5           8          23[4]56
        */
        start = myCurrentPage - Math.floor(showPageNo/2) // 4 - 2
        /* 
        myCurrentPage, showPageNo, totalPages
          2                 5           8          1[2]345
        start上面算出的是0, 应该为1
        */
        // 当当前页码比较小时, start值就会小于1, 小于了最小值
        if (start<1) {
          start = 1
        }

        // 计算end
        // 根据start和showPageNo来计算end
        /* 
        myCurrentPage, showPageNo, totalPages
          2                 5           8          1[2]345
        start上面算出为1
        */
        end = start + showPageNo -1  // 1 + 5 - 1

        //  end最大值为totalPages, 如果超过了, 修正为totalPages
        /* 
        myCurrentPage, showPageNo, totalPages
          8                5           9        567[8]9
        start上面算出为 6  ==> 9 - 5 + 1 = 5
        end上面算出为  10  ==> 9
        */
        if (end>totalPages) {
          // 修正end
          end = totalPages
          // 修正start
          start = end - showPageNo + 1  // 前提是totalPages>=showPageNo
          /* 
          myCurrentPage, showPageNo, totalPages
            4                6           5        123[4]5
          start上面算出为 5 - 6 + 1 = 0
          end上面算出为  5
          */
          // 如果totalPages<showPageNo ==> 上面的计算start是小于1的
          if (start<1) {
            start = 1
          }
        }
        // 返回结果数据
        return {
          start,
          end
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>